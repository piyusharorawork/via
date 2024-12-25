import { getSampleVideoFilePath, getTempFilePath } from "@via/common/path";
import { downloadYoutubeVideo } from "@via/core/video-downloader";
import { resizeVideo } from "@via/core/video-resizer";
import { trimVideo } from "@via/core/video-timmer";

(async () => {
  console.log("downloading video");

  const videoURL = "https://www.youtube.com/shorts/Why7d611PVA";

  const videoName = "house";

  const originalVideoPath = getTempFilePath(`${videoName}-original.mp4`);

  await downloadYoutubeVideo(videoURL, originalVideoPath);

  const resizedVideoPath = getTempFilePath(`${videoName}-resized.mp4`);

  await resizeVideo({
    outputFilePath: resizedVideoPath,
    resolution: "LOW",
    videoPath: originalVideoPath,
  });

  const trimmedVideoPath = getSampleVideoFilePath(`${videoName}.mp4`);

  await trimVideo({
    start: 0,
    end: 9,
    outputPath: trimmedVideoPath,
    videoPath: resizedVideoPath,
  });
})();
