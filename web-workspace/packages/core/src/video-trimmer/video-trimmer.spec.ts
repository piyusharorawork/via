import { expect, test, describe } from "vitest";
import { trimVideo } from "./video-trimmer.js";

import fs from "fs";
import { getSampleVideoFilePath, getTempFilePath } from "@via/common/path";

describe("trim video", () => {
  const scenerios = [
    {
      name: "trim video from 5 sec to 1 sec",
      videoPath: getSampleVideoFilePath("5-sec.mp4"),
      start: 1,
      end: 2,
      outputFilePath: getTempFilePath("1-sec-trimmed.mp4"),
    },
  ];

  for (const scenerio of scenerios) {
    test(scenerio.name, async () => {
      await trimVideo({
        end: scenerio.end,
        start: scenerio.start,
        outputPath: scenerio.outputFilePath,
        videoPath: scenerio.videoPath,
      });

      const isResizedVideoCreated = fs.existsSync(scenerio.outputFilePath);
      expect(isResizedVideoCreated).toBe(true);
    });
  }
});
