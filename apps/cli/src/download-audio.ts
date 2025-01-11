import { getSampleVideoFilePath } from "@via/common/path";
import { downloadAudioFromVideo } from "@via/core/video-downloader";

(async () => {
  console.log("downloading audio");

  const videoURL =
    "https://www.renderforest.com/template/luxurious-hotel-highlights-reel";

  const audioName = "hotel-highlight-reel";

  const originalAudioPath = getSampleVideoFilePath(`${audioName}-original.mp3`);

  await downloadAudioFromVideo(videoURL, originalAudioPath);
})();
