import { getFileStore, getVideoStore } from "../helpers.js";
import { downloadYoutubeVideo } from "../video-downloader/video-downloader.js";
import {
  addVideoInput,
  AddVideoInput,
  AddVideoOutput,
  ListVideoItem,
  ListVideosInput,
  ListVideosOutput,
} from "./video-manager.schema.js";
import { uploadFile } from "@via/node-sdk/upload-file";
import { v4 as generateId } from "uuid";
import _ from "lodash";
export * from "./video-manager.schema.js";

export const addVideo = (input: AddVideoInput) => {
  return new Promise<AddVideoOutput>(async (resolve, reject) => {
    try {
      await addVideoInput.parseAsync(input);
      const videoPath = `downloads/${input.name}.mp4`;
      await downloadYoutubeVideo(input.youtubeURL, videoPath);
      // TODO ensure upload server is stable and running
      // TODO upload file utility function must be part of workflow itself
      const fileId = await uploadFile("http://localhost:4000", videoPath);
      const videoStore = getVideoStore();
      const videoUUID = generateId();

      await videoStore.insert({
        fileId,
        description: input.description,
        name: input.name,
        uuid: videoUUID,
      });

      return resolve({ videoUUID });
    } catch (error) {
      // TODO refactor with improved types
      // TODO move this to upload file handle function
      const errorCode: string = _.get(error, "code", "");
      if (errorCode === "ECONNREFUSED") {
        return reject("file server is not running at http://localhost:4000");
      }

      return reject(error);
    }
  });
};

export const listVideos = (input: ListVideosInput) => {
  return new Promise<ListVideosOutput>(async (resolve, reject) => {
    try {
      const videoStore = getVideoStore();
      const fileStore = getFileStore();
      const videos = await videoStore.list(input.limit);

      const videoURLMap: Record<string, string> = {};
      for (const video of videos) {
        // TODO can be optimized more
        const file = await fileStore.get(video.fileId);
        const videoURL = `http://localhost:4000/${file.path}`;
        videoURLMap[video.id] = videoURL;
      }

      const videosOutput: ListVideosOutput = videos.map((video) => {
        let url = videoURLMap[video.id];
        if (!url) {
          throw `no video url found for video id = ${video.id}`;
        }
        const item: ListVideoItem = {
          name: video.name,
          url,
          uuid: video.uuid,
        };

        return item;
      });

      return resolve(videosOutput);
    } catch (error) {
      reject(error);
    }
  });
};
