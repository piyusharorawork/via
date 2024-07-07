import {
  DownloadVideoInput,
  downloadYoutubeVideo,
} from "@via/youtube-downloader/download-video";

(async () => {
  try {
    const input: DownloadVideoInput = {
      dirPath: "downloads",
      start: "00:00:02",
      end: "00:00:15",
      url: "https://www.youtube.com/watch?v=JrSMDDQRF5Q",
      fileName: "lord-ram-1.mp4",
    };

    await downloadYoutubeVideo(input);
  } catch (error) {
    console.error(error);
  }
})();
