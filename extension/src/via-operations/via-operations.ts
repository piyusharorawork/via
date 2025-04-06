import { downloadVideo } from "./operations/download-video.operation";
import { extractImage } from "./operations/extract-image.operation";
import { showClipInfo } from "./operations/show-clip-info.operation";
import { copyFileUrl } from "./operations/copy-file-url.operation";
import { copyMp4Url } from "./operations/copy-mp4-url.operation";

export const viaOperations = {
  showClipInfo,
  downloadVideo,
  copyFileUrl,
  extractImage,
  copyMp4Url,
};
