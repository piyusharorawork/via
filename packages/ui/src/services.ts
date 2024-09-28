import { FFmpeg } from "@ffmpeg/ffmpeg";
import { utils } from "./utils";

type ExportVideoInput = {
  ffmpeg: FFmpeg;
  frames: number;
  canvas: HTMLCanvasElement | null;
  fps: number;
  setFrame: (frameNumber: number) => Promise<void>;
};

export const services = {
  exportVideo: async (input: ExportVideoInput) => {
    await utils.loadFFMPEG(input.ffmpeg);

    for (let i = 0; i < input.frames; i++) {
      await input.setFrame(i);
      const pngBlob = await utils.canvasToPNGBlog(input.canvas);
      const fileName = `input${i.toString().padStart(4, "0")}.png`;
      await utils.savePNG(input.ffmpeg, fileName, pngBlob);
    }
    const outputFileName = "out.mp4";
    await utils.convertImagesToVideo(input.ffmpeg, input.fps, outputFileName);

    // // TODO Error handling
    const videoUrl = await utils.generateVideoBlobURL(
      input.ffmpeg,
      outputFileName
    );

    // TODO Delete that folder
    return videoUrl;
  },
};
