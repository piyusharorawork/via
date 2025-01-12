import { getSampleVideoFilePath } from "@via/common/path";
import { VideoInfo } from "@via/core/video-info";

(async () => {
  const videoPath = getSampleVideoFilePath("combined.mp4");

  const videoInfo = new VideoInfo(videoPath);

  const fps = await videoInfo.getFPS();
  const frameCount = await videoInfo.getFrameCount();
  const frameSize = await videoInfo.getFrameSize();

  console.log({ fps, frameCount, frameSize });
})();
