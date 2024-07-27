import { expect, test, describe } from "vitest";
import { generateVideo } from "./generate-video.js";
import { v4 } from "uuid";
import fs from "fs";

describe("generate video", () => {
  const scenerios = [
    {
      name: "generate 1 sec video with some hello text",
      quote: "Hello",
      videoPath: "assets/1-sec.mp4",
      generatedVideoPath: `exports/1-sec-with-hello.mp4`,
    },
  ];

  for (const scenerio of scenerios) {
    test(scenerio.name, async () => {
      await generateVideo({
        quote: scenerio.quote,
        videoPath: scenerio.videoPath,
        generatedVideoPath: scenerio.generatedVideoPath,
      });
      const isExist = fs.existsSync(scenerio.generatedVideoPath);
      expect(isExist).toBeTruthy();
    });
  }
});
