import { getSampleVideoFilePath, getTempFilePath } from "@via/common/path";
import { downloadYoutubeVideo } from "@via/core/video-downloader";
import { resizeVideo } from "@via/core/video-resizer";
import { trimVideo } from "@via/core/video-timmer";

(async () => {
  console.log("downloading video");

  const videoURL =
    "https://res.cloudinary.com/dmtxtgvsb/video/upload/v1736600178/hotel-highlight-reel-original.mp4";

  const videoName = "hotel-highlight-reel";

  const originalVideoPath = getTempFilePath(`${videoName}-original.mp4`);

  await downloadYoutubeVideo(videoURL, originalVideoPath);

  const resizedVideoPath = getSampleVideoFilePath(
    `${videoName}-hotel-highlight-reel-540p.mp4`
  );

  await resizeVideo({
    outputFilePath: resizedVideoPath,
    resolution: "LOW_RES_HD_540p",
    videoPath: originalVideoPath,
  });

  // const trimmedVideoPath = getSampleVideoFilePath(`${videoName}.mp4`);

  // await trimVideo({
  //   start: 0,
  //   end: 9,
  //   outputPath: trimmedVideoPath,
  //   videoPath: resizedVideoPath,
  // });
})();
