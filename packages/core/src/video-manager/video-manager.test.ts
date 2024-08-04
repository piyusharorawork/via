import { expect, test, describe } from "vitest";
import { VideoManager } from "./video-manager";
import { v4 as generateId, v4 } from "uuid";
import { VideoStore } from "@via/store/video-store";
import { FileStore } from "@via/store/file-store";
import { uploadFile } from "../file-uploader/file-uploader";
import { getEnvVariables } from "../helpers";
import { getSampleVideoFilePath } from "@via/common/path";

const { finderURL, token, databaseName, serverBaseURL, model } =
  getEnvVariables();

describe("add video", () => {
  const scenerios = [
    {
      name: "add one video",
      videoName: "one-sec-video",
      youtubeURL: "https://www.youtube.com/watch?v=MvsAesQ-4zA",
      videoDesciption: "it is a quick sample video of 1 second duration",
      expectedVideoFound: true,
    },
  ];

  const videoManager = new VideoManager({
    databaseName,
    serverBaseURL,
    token,
    finderURL,
    model,
  });
  const videoStore = new VideoStore(databaseName);

  for (const scenerio of scenerios) {
    test(scenerio.name, async () => {
      const { videoUUID } = await videoManager.addVideo({
        name: scenerio.videoName,
        description: scenerio.videoDesciption,
        youtubeURL: scenerio.youtubeURL,
      });

      const { found, video } = await videoStore.get(videoUUID);
      expect(found).toBe(scenerio.expectedVideoFound);
      expect(video?.uuid).toBe(videoUUID);
    });
  }
});

describe("list videos", () => {
  const scenerios = [
    {
      name: "get only 1 valid video",
      limit: 10,
    },
  ];

  const videoManager = new VideoManager({
    databaseName,
    serverBaseURL,
    token,
    finderURL,
    model,
  });

  for (const scenerio of scenerios) {
    test(scenerio.name, async () => {
      await videoManager.listVideos({ limit: scenerio.limit });
    });
  }
});

describe("remove video", () => {
  const scenerios = [
    {
      name: "with valid uuid",
      limit: 1,
      uuid: generateId(),
    },
  ];

  const videoManager = new VideoManager({
    databaseName,
    serverBaseURL,
    token,
    finderURL,
    model,
  });
  const videoStore = new VideoStore(databaseName);
  const fileStore = new FileStore(databaseName);

  for (const scenerio of scenerios) {
    test(scenerio.name, async () => {
      const { serverBaseURL } = getEnvVariables();
      const sampleFile = getSampleVideoFilePath("1-sec.mp4");
      const file = await uploadFile(serverBaseURL, sampleFile);

      const fileId = await fileStore.insert({
        destination: file.destination,
        fileName: file.filename,
        mimeType: file.mimetype,
        originalName: file.originalname,
        path: file.path,
      });
      await videoStore.insert({
        fileId,
        uuid: scenerio.uuid,
        description: "some-description",
        name: "some-name",
        originalURL: "some-url",
      });

      const { success } = await videoManager.removeVideo({
        videoUUID: scenerio.uuid,
      });
      await videoStore.get(scenerio.uuid);
      expect(success).toBeTruthy();
      const { found } = await videoStore.get(scenerio.uuid);
      expect(found).toBeFalsy();
    });
  }
});

describe("view video", () => {
  const scenerios = [
    {
      name: "valid video",
      videoName: "some-name",
      videoUUID: generateId(),
      youtubeURL: "http://some-url",
      videoDescription: "some video description",
      videoURL: "http://localhost:4000/some/path",
    },
  ];

  const videoManager = new VideoManager({
    databaseName,
    serverBaseURL,
    token,
    finderURL,
    model,
  });
  const videoStore = new VideoStore(databaseName);
  const fileStore = new FileStore(databaseName);

  for (const scenerio of scenerios) {
    test(scenerio.name, async () => {
      const { serverBaseURL } = getEnvVariables();
      const sampleVideoPath = getSampleVideoFilePath("1-sec.mp4");
      const file = await uploadFile(serverBaseURL, sampleVideoPath);

      const fileId = await fileStore.insert({
        destination: file.destination,
        fileName: file.filename,
        mimeType: file.mimetype,
        originalName: file.originalname,
        path: file.path,
      });
      await videoStore.insert({
        fileId,
        uuid: scenerio.videoUUID,
        description: scenerio.videoDescription,
        name: scenerio.videoName,
        originalURL: scenerio.youtubeURL,
      });

      const video = await videoManager.viewVideo({
        videoUUID: scenerio.videoUUID,
      });
      expect(video.createdAt.length).toBeGreaterThan(0);
      expect(video.descrption).toBe(scenerio.videoDescription);
      expect(video.name).toBe(scenerio.videoName);
      expect(video.videoUUID).toBe(scenerio.videoUUID);
      expect(video.originalURL).toBe(scenerio.youtubeURL);
    });
  }
});

describe("make video", () => {
  const scenerios = [
    {
      name: "make 1 sec video",
      quote: "Hello",
    },
  ];

  const videoManager = new VideoManager({
    databaseName,
    serverBaseURL,
    token,
    finderURL,
    model,
  });
  const videoStore = new VideoStore(databaseName);
  const fileStore = new FileStore(databaseName);

  for (const scenerio of scenerios) {
    test(scenerio.name, async () => {
      const file = await uploadFile(
        "http://localhost:4000",
        getSampleVideoFilePath("1-sec.mp4")
      );

      const fileId = await fileStore.insert({
        destination: file.destination,
        fileName: file.filename,
        mimeType: file.mimetype,
        originalName: file.originalname,
        path: file.path,
      });
      const videoUUID = v4();
      await videoStore.insert({
        description: "some description",
        fileId: fileId,
        name: "1-sec-video",
        originalURL: "",
        uuid: videoUUID,
      });
      const { videoURL } = await videoManager.makeVideo({
        quote: scenerio.quote,
        prompt: "some",
      });
      expect(videoURL).toContain("http://");
    });
  }
});
