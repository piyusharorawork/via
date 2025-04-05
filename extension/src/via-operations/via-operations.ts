import { downloadVideo } from "./operations/download-video.operation";
import { extractImage } from "./operations/extract-image.operation";
import { showClipInfo } from "./operations/show-clip-info.operation";
import { uploadFile } from "./operations/upload-file.operation";

export const viaOperations = {
  showClipInfo,
  downloadVideo,
  uploadFile,
  extractImage,
};
