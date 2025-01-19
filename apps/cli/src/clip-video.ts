import { getSampleVideoFilePath } from "@via/common/path";
import { clipVideo } from "@via/core/clip-video";

(async () => {
  await clipVideo({
    videoPath: getSampleVideoFilePath("hotel-highlight-reel-original.mp4"),
    outputPath: getSampleVideoFilePath("clip.mp4"),
    from: 379,
    to: 392,
  });
})();
