import { formFileURL } from "../helpers.js";
import { downloadYoutubeVideo } from "../video-downloader/video-downloader.js";
import {
  addVideoInput,
  AddVideoInput,
  AddVideoOutput,
  ListVideoItem,
  ListVideosInput,
  ListVideosOutput,
  MakeVideoInput,
  MakeVideoOutput,
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
import { FileUploader, uploadFile } from "../file-uploader/file-uploader.js";
import { resizeVideo } from "../video-resizer/video-resizer.js";
import { generateVideo } from "../generate-video/generate-video.js";
import { VideoFinder } from "../find-video/find-video.js";
import { trimVideo } from "../video-trimmer/video-trimmer.js";
import { getTempFilePath } from "@via/common/path";
import { VideoInfo } from "../video-info/video-info.js";
export * from "./video-manager.schema.js";

type VideoManagerConfig = {
  databaseName: string;
  serverBaseURL: string;
  token: string;
  finderURL: string;
  model: string;
};

export class VideoManager {
  private videoStore: VideoStore;
  private fileStore: FileStore;
  private fileUploader: FileUploader;
  private videoFinder: VideoFinder;

  constructor(config: VideoManagerConfig) {
    this.videoStore = new VideoStore(config.databaseName);
    this.fileStore = new FileStore(config.databaseName);
    this.fileUploader = new FileUploader(config.serverBaseURL);
    this.videoFinder = new VideoFinder({
      token: config.token,
      url: config.finderURL,
      model: config.model,
    });
  }

  async addVideo(input: AddVideoInput): Promise<AddVideoOutput> {
    try {
      await addVideoInput.parseAsync(input);
      const videoPath = getTempFilePath(`${input.name}.mp4`);
      await downloadYoutubeVideo(input.youtubeURL, videoPath);
      const resizedVideoPath = getTempFilePath(`${generateId()}.mp4`);
      await resizeVideo({
        outputFilePath: resizedVideoPath,
        resolution: "LOW",
        videoPath,
      });
      const trimmedVideoPath = getTempFilePath(`${generateId()}.mp4`);
      await trimVideo({
        end: 5,
        start: 0,
        outputPath: trimmedVideoPath,
        videoPath: resizedVideoPath,
      });

      // TODO ensure upload server is stable and running
      // TODO upload file utility function must be part of workflow itself
      const file = await this.fileUploader.uploadFile(trimmedVideoPath);

      const fileId = await this.fileStore.insert({
        destination: file.destination,
        fileName: file.filename,
        mimeType: file.mimetype,
        originalName: file.originalname,
        path: file.path,
      });

      const videoUUID = generateId();

      const videoInfo = new VideoInfo(trimmedVideoPath);

      const fps = await videoInfo.getFPS();
      const frameCount = await videoInfo.getFrameCount();
      const { height, width } = await videoInfo.getFrameSize();

      await this.videoStore.insert({
        fileId,
        description: input.description,
        name: input.name,
        uuid: videoUUID,
        originalURL: input.youtubeURL,
        fps,
        frameCount,
        frameHeight: height,
        frameWidth: width,
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
          const videoURL = formFileURL(file.fileName);
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
          id: video.id,
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

      const videoURL = formFileURL(file.fileName);

      return {
        createdAt: video.createdAt,
        descrption: video.description,
        name: video.name,
        videoUUID: video.uuid,
        originalURL: video.originalURL,
        videoURL,
        fps: video.fps,
        frameCount: video.frameCount,
        height: video.frameHeight,
        width: video.frameWidth,
      };
    } catch (error) {
      throw error;
    }
  }

  async makeVideo(input: MakeVideoInput): Promise<MakeVideoOutput> {
    try {
      const { quote, prompt } = input;

      const videos = await this.videoStore.list(10);
      const videoId = await this.videoFinder.findVideo({ prompt, videos });
      const video = videos.find((video) => video.id === videoId);

      if (!video) {
        throw "no video found";
      }

      const { file, found } = await this.fileStore.get(video.fileId);

      if (!found) {
        throw "no file found";
      }

      const backgroundVideoURL = formFileURL(file.fileName);
      const generatedVideoPath = getTempFilePath(`${generateId()}.mp4`);

      await generateVideo({
        generatedVideoPath,
        quote,
        videoPath: backgroundVideoURL,
      });

      const uploadedFile =
        await this.fileUploader.uploadFile(generatedVideoPath);

      const videoURL = formFileURL(uploadedFile.filename);

      return {
        videoURL,
      };
    } catch (error) {
      throw error;
    }
  }
}
