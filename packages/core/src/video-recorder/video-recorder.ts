import { execa, ExecaChildProcess } from "execa";
import { getSampleVideoFilePath } from "@via/common/path";

type VideoWriterConfig = {
  width: number;
  height: number;
  videoPath: string;
};

class VideoWriter {
  private config: VideoWriterConfig;
  private myProcess: ExecaChildProcess<string> | null;
  constructor(config: VideoWriterConfig) {
    this.config = config;
    this.myProcess = null;
  }

  start(onDone: () => void) {
    const args = [
      "-y",
      "-f",
      "rawvideo",
      "-pixel_format",
      "rgba",
      "-video_size",
      `${this.config.width}x${this.config.height}`,
      "-r",
      "30",
      "-i",
      "pipe:0",
      "-c:v",
      "libx264",
      "-pix_fmt",
      "yuv420p",
      this.config.videoPath,
    ];

    this.myProcess = execa("ffmpeg", args);
    this.myProcess.on("exit", (code) => {
      if (code !== 0) {
        throw "exist code non 0 " + code;
      }
      onDone();
    });
  }

  write(buffer: Buffer) {
    if (!this.myProcess || !this.myProcess.stdin) {
      throw "no process stdin";
    }

    this.myProcess.stdin.write(buffer);
  }

  async finish() {
    if (!this.myProcess || !this.myProcess.stdin) {
      throw "no process stdin";
    }

    this.myProcess.stdin.end();
    await this.myProcess;
  }
}

export const recordVideo = async () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const width = 640;
      const height = 360;
      const outputVideoPath = "output_video.mp4";

      const videoWriter = new VideoWriter({
        height,
        width,
        videoPath: outputVideoPath,
      });

      videoWriter.start(() => resolve());

      const createDummyFrame = () => {
        const frameBuffer = Buffer.alloc(width * height * 4);
        for (let i = 0; i < frameBuffer.length; i += 4) {
          frameBuffer[i] = 255; // Red
          frameBuffer[i + 1] = 0; // Green
          frameBuffer[i + 2] = 0; // Blue
          frameBuffer[i + 3] = 255; // Alpha
        }
        return frameBuffer;
      };

      const totalFrames = 30;

      for (let i = 0; i < totalFrames; i++) {
        const frameBuffer = createDummyFrame();
        videoWriter.write(frameBuffer);
      }

      await videoWriter.finish();
      resolve();

      //   const outAargs = [
      //     "-f",
      //     "rawvideo",
      //     "-vcodec",
      //     "rawvideo",
      //     "-pix_fmt",
      //     "rgba",
      //     "-s",
      //     "640x360",
      //     "-r",
      //     "30000/1001",
      //     "-i",
      //     "-",
      //     "-map",
      //     "0:v:0",
      //     "-vf",
      //     "format=yuv420p",
      //     "-vcodec",
      //     "libx264",
      //     "-profile:v",
      //     "high",
      //     "-preset:v",
      //     "medium",
      //     "-crf",
      //     "18",
      //     "-movflags",
      //     "faststart",
      //     "-y",
      //     "out.mp4",
      //   ];
      //   const outProcess = execa("ffmpeg", outAargs);
      //   outProcess.on("close", () => {
      //     console.log("close");
      //   });
      //   outProcess.catch((err) => {
      //     console.error(err);
      //   });
      //   outProcess.on("exit", (code) => {
      //     console.log("exit code = " + code);
      //     resolve();
      //   });
      //   const oneSecVideo = getSampleVideoFilePath("1-sec.mp4");
      //   const inArgs = [
      //     "-i",
      //     oneSecVideo,
      //     "-f",
      //     "rawvideo",
      //     "-pix_fmt",
      //     "rgba",
      //     "-",
      //   ];
      //   const inProcess = execa("ffmpeg", inArgs);
      //   let frameBuffer = Buffer.alloc(0);
      //   const width = 640;
      //   const height = 360;
      //   const channels = 4;
      //   const frameByteSize = width * height * channels; // 9,21,600
      //   let buf = Buffer.allocUnsafe(frameByteSize);
      //   let length = 0;
      //   function getNextFrame() {
      //     if (length >= frameByteSize) {
      //       // copy the frame
      //       buf.copy(frameBuffer, 0, 0, frameByteSize);
      //       // move remaining buffer content to the beginning
      //       buf.copy(buf, 0, frameByteSize, length);
      //       length -= frameByteSize;
      //       return frameBuffer;
      //     }
      //     return null;
      //   }
      //   inProcess.stdout?.on("data", async (chunk) => {
      //     const nCopied = Math.min(buf.length - length, chunk.length); // 8192
      //     chunk.copy(buf, length, 0, nCopied);
      //     length += nCopied;
      //     const frame = getNextFrame();
      //     console.log(frame);
      //     // await new Promise((r) => outProcess.stdin?.write(chunk, r));
      //     // frameBuffer = Buffer.concat([frameBuffer, chunk]);
      //     // const frameSize = 640 * 360 * 4; // width * height * RGBA (4 bytes per pixel)
      //     // while (frameBuffer.length >= frameSize) {
      //     //   // Extract frame
      //     //   const frame = frameBuffer.slice(0, frameSize);
      //     //   // Do something with the frame (e.g., process it)
      //     //   await new Promise((r) => outProcess.stdin?.write(frame, r));
      //     //   // Remove processed frame from buffer
      //     //   frameBuffer = frameBuffer.slice(frameSize);
      //     // }
      //   });
      //   inProcess.stderr?.on("data", (data) => {
      //     console.log(`error = ${data}`);
      //   });
      //   inProcess.on("close", async (code) => {
      //     console.log("close with code = " + code);
      //     outProcess.stdin?.end();
      //     await outProcess;
      //     resolve();
      //   });
    } catch (error) {
      reject(error);
    }
  });
};
