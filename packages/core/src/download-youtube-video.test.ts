import { expect, test } from "vitest";
import { downloadYoutubeVideo } from "./download-youtube-video";

import fs from "fs";

test("download youtube video", async () => {
  const oneSecondVideoURL = "https://www.youtube.com/watch?v=MvsAesQ-4zA";
  const videoPath = "downloads/1-sec-video.mp4";

  const isVideoFileExist = fs.existsSync(videoPath);

  if (isVideoFileExist) {
    fs.unlinkSync(videoPath);
  }

  await downloadYoutubeVideo(oneSecondVideoURL, videoPath);

  const isVideoFileCreated = fs.existsSync(videoPath);
  expect(isVideoFileCreated).toBe(true);
});
