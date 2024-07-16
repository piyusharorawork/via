import { expect, test, describe, beforeAll } from "vitest";
import { listVideos } from "./list-videos";
import { v4 as generateId } from "uuid";
import { createVideoStore } from "@via/store/video-store";
import { getFileStore, getVideoStore } from "../helpers";

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
