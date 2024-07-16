import { expect, test, describe } from "vitest";
import { listVideos } from "./list-videos";
import { v4 as generateId } from "uuid";
import { createVideoStore } from "@via/store/video-store";
import { getFileStore, getVideoStore } from "../helpers";

describe("list videos workflow", () => {
  const scenerios = [
    {
      name: "get only 1 valid video",
      limit: 1,
    },
  ];

  for (const scenerio of scenerios) {
    // const videoStore = getVideoStore();
    // const fileStore = getFileStore();

    test(scenerio.name, async () => {
      //   console.log(process.env.DATABASE_NAME);
      //   const videoUUID = generateId();
      //   await addVideo({
      //     name: scenerio.videoName,
      //     description: scenerio.videoDesciption,
      //     youtubeURL: scenerio.youtubeURL,
      //     uuid: videoUUID,
      //   });
      //   const video = await videoStore.get(videoUUID);
      //   expect(video.uuid).toBe(video.uuid);
    });
  }
});
