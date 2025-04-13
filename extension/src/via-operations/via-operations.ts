import { downloadVideo } from "./operations/download-video.operation";
import { extractImage } from "./operations/extract-image.operation";
import { showClipInfo } from "./operations/show-clip-info.operation";
import { copyFileUrl } from "./operations/copy-file-url.operation";
import { copyMp4Url } from "./operations/copy-mp4-url.operation";
import { copyMutedUrl } from "./operations/copy-muted-url.operation";
import { compressVideo } from "./operations/compress-video.operation";
import { extractClip } from "./operations/extract-clip.operation";
import { extractCompressedImage } from "./operations/extract-compressed-image.operation";
import { downloadAudio } from "./operations/download-audio.operation";

export const viaOperations = {
  showClipInfo,
  downloadVideo,
  copyFileUrl,
  extractImage,
  copyMp4Url,
  copyMutedUrl,
  compressVideo,
  extractClip,
  extractCompressedImage,
  downloadAudio,
};
