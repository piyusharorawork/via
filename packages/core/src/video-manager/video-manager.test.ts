import { expect, test, describe } from "vitest";
import { addVideo, listVideos, removeVideo, viewVideo } from "./video-manager";
import { getFileStore, getVideoStore } from "../helpers";
import { v4 as generateId } from "uuid";

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

  for (const scenerio of scenerios) {
    const videoStore = getVideoStore();

    test(scenerio.name, async () => {
      const { videoUUID } = await addVideo({
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
      videoName: "some-video",
      videoPath: "some/path",
      expectedURL: "http://localhost:4000/some/path",
      uuid: generateId(),
    },
  ];

  for (const scenerio of scenerios) {
    test(scenerio.name, async () => {
      const videoStore = getVideoStore();
      const fileStore = getFileStore();
      const fileId = await fileStore.insert({
        destination: "dst",
        fileName: "some-file.txt",
        mimeType: "some-mimetype",
        originalName: "some-original-name",
        path: "some/path",
      });

      await videoStore.insert({
        fileId,
        name: scenerio.videoName,
        description: "some description",
        uuid: scenerio.uuid,
        originalURL: "some-original-url",
      });
      const videos = await listVideos({ limit: scenerio.limit });
      // TODO better expectations than just length
      expect(videos.length).toBeGreaterThan(0);
    });
  }
});

describe("remove video", () => {
  const scenerios = [
    {
      name: "with valid uuid",
      limit: 1,
      uuid: generateId(),
      expectedSuccess: true,
      videoPath: "some/path",
    },
  ];

  for (const scenerio of scenerios) {
    test(scenerio.name, async () => {
      const videoStore = getVideoStore();
      const fileStore = getFileStore();
      const fileId = await fileStore.insert({
        destination: "dst",
        fileName: "file1.txt",
        mimeType: "textfile",
        originalName: "file1.txt",
        path: scenerio.videoPath,
      });
      await videoStore.insert({
        fileId,
        uuid: scenerio.uuid,
        description: "some-description",
        name: "some-name",
        originalURL: "some-url",
      });

      const { success } = await removeVideo({ videoUUID: scenerio.uuid });
      await videoStore.get(scenerio.uuid);
      expect(success).toBe(scenerio.expectedSuccess);
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
      videoPath: "/some/path",
      videoDescription: "some video description",
      videoURL: "http://localhost:4000/some/path",
    },
  ];

  for (const scenerio of scenerios) {
    test(scenerio.name, async () => {
      const videoStore = getVideoStore();
      const fileStore = getFileStore();
      const fileId = await fileStore.insert({
        destination: "dst",
        fileName: "file1.txt",
        mimeType: "textfile",
        originalName: "file1.txt",
        path: scenerio.videoPath,
      });
      await videoStore.insert({
        fileId,
        uuid: scenerio.videoUUID,
        description: scenerio.videoDescription,
        name: scenerio.videoName,
        originalURL: scenerio.youtubeURL,
      });

      const video = await viewVideo({ videoUUID: scenerio.videoUUID });
      expect(video.createdAt.length).toBeGreaterThan(0);
      expect(video.descrption).toBe(scenerio.videoDescription);
      expect(video.name).toBe(scenerio.videoName);
      expect(video.videoUUID).toBe(scenerio.videoUUID);
      expect(video.originalURL).toBe(scenerio.youtubeURL);
      expect(video.videoURL).toBe(scenerio.videoURL);
    });
  }
});
