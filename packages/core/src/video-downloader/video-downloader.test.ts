import { expect, test, describe } from "vitest";
import { downloadYoutubeVideo } from "./video-downloader";

import fs from "fs";

describe("download youtube video", () => {
  const scenerios = [
    {
      name: "valid small video",
      videoURL: "https://www.youtube.com/watch?v=MvsAesQ-4zA",
      videoPath: "downloads/1-sec-video.mp4",
      expected: true,
    },
  ];

  for (const scenerio of scenerios) {
    test(scenerio.name, async () => {
      const isVideoFileExist = fs.existsSync(scenerio.videoPath);

      if (isVideoFileExist) {
        fs.unlinkSync(scenerio.videoPath);
      }

      await downloadYoutubeVideo(scenerio.videoURL, scenerio.videoPath);

      const isVideoFileCreated = fs.existsSync(scenerio.videoPath);
      expect(isVideoFileCreated).toBe(scenerio.expected);
    });
  }
});
