import { expect, test, describe } from "vitest";
import { VideoFinder } from "./find-video.js";
import { getEnvVariables } from "../helpers.js";

describe("Video Finder", () => {
  const scenerios = [
    {
      name: "find relevant video",
      videos: [
        {
          id: 1,
          description: "Different fruits and vegetables",
        },
        {
          id: 2,
          description: "Learn about different gadgets and tech",
        },
        {
          id: 3,
          description: "How politics is become so dirty",
        },
        {
          id: 4,
          description:
            "Why Friends and How I met your mother are best TV series",
        },
      ],
      prompt: "TV Series",
      expectedVideoId: 4,
    },
  ];
  const { finderURL, token } = getEnvVariables();
  const videoFinder = new VideoFinder({ url: finderURL, token });

  for (const scenerio of scenerios) {
    test(scenerio.name, async () => {
      const videoId = await videoFinder.findVideo({
        videos: scenerio.videos,
        prompt: scenerio.prompt,
      });
      expect(videoId).toBe(scenerio.expectedVideoId);
    });
  }
});
