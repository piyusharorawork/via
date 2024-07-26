import { expect, test, describe } from "vitest";
import { resizeVideo } from "./video-resizer.js";
import { v4 } from "uuid";

import fs from "fs";

describe("resize video", () => {
  const scenerios = [
    {
      name: "resize to valid size",
      videoPath: "assets/1-sec.mp4",
      width: 50,
      height: 50,
      outputFilePath: `temp/1-sec-resized.mp4`,
    },
  ];

  for (const scenerio of scenerios) {
    test(scenerio.name, async () => {
      await resizeVideo(
        scenerio.videoPath,
        scenerio.width,
        scenerio.height,
        scenerio.outputFilePath
      );

      const isResizedVideoCreated = fs.existsSync(scenerio.outputFilePath);
      expect(isResizedVideoCreated).toBe(true);
    });
  }
});
