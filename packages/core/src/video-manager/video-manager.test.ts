import { expect, test, describe } from "vitest";
import { addVideo, listVideos } from "./video-manager";
import { getFileStore, getVideoStore } from "../helpers";
import { v4 as generateId } from "uuid";

describe("add video workflow", () => {
  const scenerios = [
    {
      name: "add one video",
      videoName: "one-sec-video",
      youtubeURL: "https://www.youtube.com/watch?v=MvsAesQ-4zA",
      videoDesciption: "it is a quick sample video of 1 second duration",
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

      const video = await videoStore.get(videoUUID);
      expect(video.uuid).toBe(videoUUID);
    });
  }
});

describe("list videos workflow", () => {
  const scenerios = [
    {
      name: "get only 1 valid video",
      limit: 1,
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
        fileName: "file1.txt",
        mimeType: "textfile",
        originalName: "file1.txt",
        path: scenerio.videoPath,
      });

      await videoStore.insert({
        fileId,
        name: scenerio.videoName,
        description: "some description",
        uuid: scenerio.uuid,
      });
      const res = await listVideos({ limit: scenerio.limit });
      // TODO need indentify more filter to fetch video for a specific sceneri
      // Expected Res need to validate
    });
  }
});
