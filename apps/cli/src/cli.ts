import { MakeVideoInput, makeVideo } from "@via/video-core/make-video";
import { join } from "path";
import { downloadYoutubeVideo } from "@via/youtube-downloader/download-video";

(async () => {
  try {
    const natureVideo = "https://www.youtube.com/watch?v=MFLVmAE4cqg";

    await downloadYoutubeVideo({
      fileName: "nature.mp4",
      url: natureVideo,
      dirPath: "downloads",
      start: "00:00:10",
      end: "00:00:20",
    });

    const input: MakeVideoInput = {
      duration: 5,
      height: 500,
      dirPath: "exports",
      fileName: "out.mp4",
      text: `Hello`,
      videoAssetPath: join("downloads", "nature.mp4"),
      width: 500,
      masterVolume: 0.05,
      bottomMargin: 0,
      fontSize: 16,
      textColor: "#ffffff",
    };
    await makeVideo(input);
  } catch (error) {
    console.error(error);
  }
})();
