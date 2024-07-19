import { expect, test, describe } from "vitest";
import { addVideo } from "./add-video";
import { v4 as generateId } from "uuid";
import { createVideoStore } from "@via/store/video-store";
import { getVideoStore } from "../helpers";

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
