import { formFileURL, getFileStore, getVideoStore } from "../helpers.js";
import { downloadYoutubeVideo } from "../video-downloader/video-downloader.js";
import {
  addVideoInput,
  AddVideoInput,
  AddVideoOutput,
  ListVideoItem,
  ListVideosInput,
  ListVideosOutput,
  removeVideoInput,
  RemoveVideoInput,
  RemoveVideoOutput,
  ViewVideoInput,
  viewVideoInput,
  ViewVideoOutput,
} from "./video-manager.schema.js";
import { uploadFile } from "@via/node-sdk/upload-file";
import { v4 as generateId } from "uuid";
import _, { remove } from "lodash";
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
        originalURL: input.youtubeURL,
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
        const { found, file } = await fileStore.get(video.fileId);
        if (found) {
          const videoURL = formFileURL(file);
          videoURLMap[video.id] = videoURL;
        }
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

export const removeVideo = (input: RemoveVideoInput) => {
  return new Promise<RemoveVideoOutput>(async (resolve, reject) => {
    try {
      await removeVideoInput.parseAsync(input);
      const videoStore = getVideoStore();
      const fileStore = getFileStore();

      const { found, video } = await videoStore.get(input.videoUUID);
      if (!found) {
        return reject("invalid video uuid");
      }

      await fileStore.remove(video.fileId);
      await videoStore.remove(input.videoUUID);

      return resolve({ success: true });
    } catch (error) {
      return reject(error);
    }
  });
};

export const viewVideo = (input: ViewVideoInput) => {
  return new Promise<ViewVideoOutput>(async (resolve, reject) => {
    try {
      const videoStore = getVideoStore();
      const { found: isVideFound, video } = await videoStore.get(
        input.videoUUID
      );
      if (!isVideFound) {
        return reject("video not found");
      }

      const fileStore = getFileStore();
      const { found: isFileFound, file } = await fileStore.get(video.fileId);

      if (!isFileFound) {
        return reject("file not found");
      }

      const videoURL = formFileURL(file);

      return resolve({
        createdAt: video.createdAt,
        descrption: video.description,
        name: video.name,
        videoUUID: video.uuid,
        originalURL: video.originalURL,
        videoURL,
      });
    } catch (error) {
      reject(error);
    }
  });
};
