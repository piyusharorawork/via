import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import { useEffect } from "react";

export const utils = {
  sleep: (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  },
  loadFFMPEG: async (ffmpeg: FFmpeg) => {
    const baseURL = "https://unpkg.com/@ffmpeg/core-mt@0.12.6/dist/esm";

    ffmpeg.on("log", ({ message }) => {
      console.log(message);
    });

    // TODO load this js from local
    const coreURL = await toBlobURL(
      `${baseURL}/ffmpeg-core.js`,
      "text/javascript"
    );
    const wasmURL = await toBlobURL(
      `${baseURL}/ffmpeg-core.wasm`,
      "application/wasm"
    );
    const workerURL = await toBlobURL(
      `${baseURL}/ffmpeg-core.worker.js`,
      "text/javascript"
    );

    // toBlobURL is used to bypass CORS issue, urls with the same
    // domain can be used directly.
    await ffmpeg.load({
      coreURL,
      wasmURL,
      workerURL,
    });
  },
  canvasToPNGBlog: async (canvas: HTMLCanvasElement | null) => {
    return new Promise<Blob>((resolve, reject) => {
      if (!canvas) {
        throw "no canvas found";
      }

      canvas.toBlob(
        (data) => {
          if (!data) {
            return reject("no blob");
          }

          resolve(data);
        },
        "image/png",
        1
      );
    });
  },
  savePNG: async (ffmpeg: FFmpeg, fileName: string, pngBlob: Blob) => {
    // TODO write it inside a folder
    await ffmpeg.writeFile(fileName, await fetchFile(pngBlob));
  },

  convertImagesToVideo: async (
    ffmpeg: FFmpeg,
    fps: number,
    outputFileName: string
  ) => {
    await ffmpeg.exec([
      "-framerate",
      `${fps}`,
      "-i",
      "input%04d.png",
      "-c:v",
      "libx264",
      "-pix_fmt",
      "yuv420p",
      outputFileName,
    ]);
  },

  generateVideoBlobURL: async (ffmpeg: FFmpeg, videoFileName: string) => {
    const fileData = await ffmpeg.readFile(videoFileName);
    const data = new Uint8Array(fileData as ArrayBuffer);
    const videoBlob = new Blob([data.buffer], { type: "video/mp4" });
    const videoUrl = URL.createObjectURL(videoBlob);
    return videoUrl;
  },

  executeOnce: (callback: () => void) => {
    useEffect(() => {
      callback();
    }, []);
  },
};
