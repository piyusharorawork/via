// import { uploadFile } from "@via/node-sdk/upload-file";
// import { addVideo } from "@via/node-sdk/create-video";
// import path from "path";
// import type { AppRouter } from "@via/router/router";
// import { downloadYoutubeVideo } from "@via/youtube-downloader/download-video";
// import { createVideoStore } from "@via/store/video-store";
import { downloadYoutubeVideo } from "@via/core/download-youtube-video";

(async () => {
  try {
    const name = "Hanuman Ji";
    const description = "Video of lord hanuman also known as bajrang bali";
    const youtubeURL = "https://www.youtube.com/shorts/A4bOUJ9AOEM";
    const start = "00:00:00";
    const end = "00:00:04";

    await downloadYoutubeVideo();

    // await downloadYoutubeVideo({
    //   dirPath: "downloads",
    //   end,
    //   start,
    //   url: youtubeURL,
    //   fileName: "hanuman.mp4",
    // });

    // const filePath = "downloads/hanuman.mp4";
    // const fileId = await uploadFile(filePath);
    // await addVideo({ description, name, fileId });

    // const videoStore = createVideoStore("sqlite.db");
    // const videos = await videoStore.list();

    // console.log(videos);
  } catch (error) {
    console.error(error);
  }
})();
