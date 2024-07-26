import { formFileURL } from "../helpers.js";
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
  ViewVideoOutput,
} from "./video-manager.schema.js";
import { v4 as generateId } from "uuid";
import _ from "lodash";
import { VideoStore } from "@via/store/video-store";
import { FileStore } from "@via/store/file-store";
import { FileUploader } from "../file-uploader/file-uploader.js";
import { resizeVideo } from "../video-resizer/video-resizer.js";
export * from "./video-manager.schema.js";

export class VideoManager {
  private videoStore: VideoStore;
  private fileStore: FileStore;
  private fileUploader: FileUploader;
  constructor(databaseName: string, serverBaseURL: string) {
    this.videoStore = new VideoStore(databaseName);
    this.fileStore = new FileStore(databaseName);
    this.fileUploader = new FileUploader(serverBaseURL);
  }

  async addVideo(input: AddVideoInput): Promise<AddVideoOutput> {
    try {
      await addVideoInput.parseAsync(input);
      const videoPath = `downloads/${input.name}.mp4`;
      await downloadYoutubeVideo(input.youtubeURL, videoPath);
      const resizedVideoPath = `exports/${generateId()}.mp4`;
      await resizeVideo(videoPath, 540, 960, resizedVideoPath);

      // TODO ensure upload server is stable and running
      // TODO upload file utility function must be part of workflow itself
      const file = await this.fileUploader.uploadFile(resizedVideoPath);

      const fileId = await this.fileStore.insert({
        destination: file.destination,
        fileName: file.filename,
        mimeType: file.mimetype,
        originalName: file.originalname,
        path: file.path,
      });

      const videoUUID = generateId();

      await this.videoStore.insert({
        fileId,
        description: input.description,
        name: input.name,
        uuid: videoUUID,
        originalURL: input.youtubeURL,
      });

      return { videoUUID };
    } catch (error) {
      throw error;
    }
  }

  async listVideos(input: ListVideosInput): Promise<ListVideosOutput> {
    try {
      const videos = await this.videoStore.list(input.limit);

      const videoURLMap: Record<string, string> = {};
      for (const video of videos) {
        // TODO can be optimized more
        const { found, file } = await this.fileStore.get(video.fileId);
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
          description: video.description,
          uuid: video.uuid,
        };

        return item;
      });

      return videosOutput;
    } catch (error) {
      throw error;
    }
  }

  async removeVideo(input: RemoveVideoInput): Promise<RemoveVideoOutput> {
    try {
      await removeVideoInput.parseAsync(input);

      const { found, video } = await this.videoStore.get(input.videoUUID);
      if (!found) {
        throw "invalid video uuid";
      }

      await this.fileStore.remove(video.fileId);
      await this.videoStore.remove(input.videoUUID);

      return { success: true };
    } catch (error) {
      throw error;
    }
  }

  async viewVideo(input: ViewVideoInput): Promise<ViewVideoOutput> {
    try {
      const { found: isVideFound, video } = await this.videoStore.get(
        input.videoUUID
      );
      if (!isVideFound) {
        throw "video not found";
      }

      const { found: isFileFound, file } = await this.fileStore.get(
        video.fileId
      );

      if (!isFileFound) {
        throw "file not found";
      }

      const videoURL = formFileURL(file);

      return {
        createdAt: video.createdAt,
        descrption: video.description,
        name: video.name,
        videoUUID: video.uuid,
        originalURL: video.originalURL,
        videoURL,
      };
    } catch (error) {
      throw error;
    }
  }
}
