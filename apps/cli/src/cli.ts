import { uploadVideo } from "@via/node-sdk/upload-video";
import path from "path";

(async () => {
  try {
    const filePath = path.join(path.resolve(), "downloads", "lord-ram-1.mp4");
    const uploadedVideo = await uploadVideo(filePath);
    console.log(uploadedVideo);
  } catch (error) {
    console.error(error);
  }
})();
