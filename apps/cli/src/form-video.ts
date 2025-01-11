import { getSampleVideoFilePath, getTempFilePath } from "@via/common/path";
import {
  downloadAudioFromVideo,
  downloadYoutubeVideo,
  combineVideoAudio,
} from "@via/core/video-downloader";

(async () => {
  try {
    console.log("making video");
    const videoUrl =
      "https://www.renderforest.com/template/luxurious-hotel-highlights-reel";

    const videoPath = getTempFilePath("hotel.mp4");
    // console.log("downloading video");
    // await downloadYoutubeVideo(videoUrl, videoPath);

    console.log("downloading audio");
    const audioPath = getTempFilePath("my-hotel.mp3");
    await downloadAudioFromVideo(videoUrl, audioPath);

    console.log("combining video and audio");
    const combinedVideoPath = getSampleVideoFilePath("combined.mp4");
    await combineVideoAudio({
      audioPath,
      outputPath: combinedVideoPath,
      videoPath,
    });
  } catch (error) {
    console.error(error);
  }
})();
