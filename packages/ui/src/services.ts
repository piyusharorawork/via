import { FFmpeg } from "@ffmpeg/ffmpeg";
import { utils } from "./utils";
import { Camera, Scene, WebGLRenderer } from "three";

type ExportVideoInput = {
  ffmpeg: FFmpeg;
  frames: number;
  canvas: HTMLCanvasElement | null;
  fps: number;
  gl: WebGLRenderer;
  scene: Scene;
  camera: Camera;
  invalidate: () => void;
  onFrame: (frame: number) => void;
};

export const services = {
  exportVideo: async (input: ExportVideoInput) => {
    await utils.loadFFMPEG(input.ffmpeg);

    for (let i = 0; i < input.frames; i++) {
      input.invalidate();
      input.gl.render(input.scene, input.camera);
      await utils.sleep(50);
      const pngBlob = await utils.canvasToPNGBlog(input.canvas);
      const fileName = `input${i.toString().padStart(4, "0")}.png`;
      await utils.savePNG(input.ffmpeg, fileName, pngBlob);
      input.onFrame(i);
    }
    const outputFileName = "out.mp4";
    await utils.convertImagesToVideo(input.ffmpeg, input.fps, outputFileName);
    const videoUrl = await utils.generateVideoBlobURL(
      input.ffmpeg,
      outputFileName
    );

    // TODO Delete that folder
    return videoUrl;
  },
};
