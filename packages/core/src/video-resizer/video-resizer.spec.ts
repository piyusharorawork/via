import { expect, test, describe } from "vitest";
import { resizeVideo, VideoResolution } from "./video-resizer.js";

import fs from "fs";
import { getSampleVideoFilePath, getTempFilePath } from "@via/common/path";

describe("resize video", () => {
  const scenerios: {
    name: string;
    videoPath: string;
    outputFilePath: string;
    resolution: VideoResolution;
  }[] = [
    {
      name: "resize to valid size",
      videoPath: getSampleVideoFilePath("1-sec.mp4"),
      outputFilePath: getTempFilePath("1-sec-resized.mp4"),
      resolution: "ULTRA_LOW",
    },
  ];

  for (const scenerio of scenerios) {
    test(scenerio.name, async () => {
      await resizeVideo({
        outputFilePath: scenerio.outputFilePath,
        resolution: scenerio.resolution,
        videoPath: scenerio.videoPath,
      });

      const isResizedVideoCreated = fs.existsSync(scenerio.outputFilePath);
      expect(isResizedVideoCreated).toBe(true);
    });
  }
});
