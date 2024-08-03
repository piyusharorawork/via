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

  start() {
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
    });
  }

  async write(buffer: Buffer) {
    if (!this.myProcess || !this.myProcess.stdin) {
      throw "no process stdin";
    }

    await new Promise((r) => this.myProcess!.stdin!.write(buffer, r));
  }

  async finish() {
    if (!this.myProcess || !this.myProcess.stdin) {
      throw "no process stdin";
    }

    this.myProcess.stdin.end();
    await this.myProcess;
  }
}

type VideoReaderConfig = {
  videoPath: string;
  width: number;
  height: number;
};

class VideoReader {
  private config: VideoReaderConfig;
  private myProcess: ExecaChildProcess<string> | null;
  constructor(config: VideoReaderConfig) {
    this.config = config;
    this.myProcess = null;
  }

  start(onFrame: (frame: Buffer) => void) {
    const args = [
      "-i",
      this.config.videoPath,
      "-f",
      "rawvideo",
      "-pix_fmt",
      "rgba",
      "-",
    ];
    this.myProcess = execa("ffmpeg", args);

    const frameSize = this.config.width * this.config.height * 4;
    const frameBuffer = Buffer.allocUnsafe(frameSize);
    let totalRemaining = frameSize;
    let targetStart = 0;
    let remainingChunk = 0;
    let frameCount = 0;

    this.myProcess.stdout?.on("data", (chunk: Buffer) => {
      if (totalRemaining > 0) {
        if (remainingChunk > 0) {
          const chunkToCopy = Math.min(remainingChunk, totalRemaining);
          chunk.copy(frameBuffer, targetStart, 0, chunkToCopy);
          targetStart += chunkToCopy;
        }

        const chunkToCopy = Math.min(chunk.length, totalRemaining);
        chunk.copy(frameBuffer, targetStart, 0, chunkToCopy);
        remainingChunk = chunk.length - chunkToCopy;
        // console.log({ remainingChunk });
        totalRemaining -= chunkToCopy;
      } else {
        totalRemaining = frameSize;
        targetStart = 0;
        remainingChunk = 0;
        frameCount++;
        console.log({ frameCount });
      }
    });

    this.myProcess.stderr?.on("data", (data) => {
      //   console.log(data);
    });

    this.myProcess.on("close", (code) => {
      console.log("close with code  = " + code);
    });
  }
}

export const recordVideo = async () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const width = 640;
      const height = 360;
      const outputVideoPath = "output_video.mp4";

      // 9,21,600

      const videoWriter = new VideoWriter({
        height,
        width,
        videoPath: outputVideoPath,
      });

      videoWriter.start();

      const oneSecVideo = getSampleVideoFilePath("1-sec.mp4");

      const videoReader = new VideoReader({
        videoPath: oneSecVideo,
        height,
        width,
      });

      let count = 0;

      videoReader.start(async (frame) => {
        //console.log(frame.length);
        // count++;
        // console.log(count);
        //console.log(frame);
        //await videoWriter.write(frame);
      });

      const createDummyFrame = () => {
        const frameBuffer = Buffer.alloc(width * height * 4);
        for (let i = 0; i < frameBuffer.length; i += 4) {
          frameBuffer[i] = 0; // Red
          frameBuffer[i + 1] = 0; // Green
          frameBuffer[i + 2] = 0; // Blue
          frameBuffer[i + 3] = 255; // Alpha
        }
        return frameBuffer;
      };

      const totalFrames = 30;

      for (let i = 0; i < totalFrames; i++) {
        const frameBuffer = createDummyFrame();
        // console.log(frameBuffer);
        // count++;
        // console.log(count);
        //videoWriter.write(frameBuffer);
      }

      //await videoWriter.finish();
      //resolve();

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

type VideoBufferConfig = {
  width: number;
  height: number;
  onFrame: (buffer: Buffer) => void;
};

export class VideoBuffer {
  // buffer to be store in between add chunk calls
  private storedFrame: Buffer;
  // buffer to be send to on frame
  private sendFrame: Buffer;

  private config: VideoBufferConfig;
  // buffer length till stored frames is filled
  private filledFrame = 0;

  // left over chunk remaning from
  private pendingChunk = Buffer.alloc(0);
  private frameSize: number;
  constructor(config: VideoBufferConfig) {
    this.frameSize = config.width * config.height * 4;
    this.storedFrame = Buffer.allocUnsafe(this.frameSize).fill(0);
    this.sendFrame = Buffer.allocUnsafe(this.frameSize).fill(0);
    this.config = config;
  }

  addChunk(chunk: Buffer) {
    const availableChunk = Buffer.allocUnsafe(
      chunk.length + this.pendingChunk.length
    ).fill(0);
    this.pendingChunk.copy(availableChunk, 0, 0, this.pendingChunk.length);
    chunk.copy(availableChunk, this.pendingChunk.length, 0, chunk.length);
    let usedChunk = 0;

    while (usedChunk < availableChunk.length) {
      let remaingFrame = this.frameSize - this.filledFrame;
      const chunkToCopy = Math.min(
        availableChunk.length - usedChunk,
        remaingFrame
      );
      if (chunkToCopy < this.frameSize) {
        this.pendingChunk = Buffer.allocUnsafe(chunkToCopy);
        availableChunk.copy(
          this.pendingChunk,
          0,
          usedChunk,
          chunkToCopy + usedChunk
        );
        break;
      }

      availableChunk.copy(
        this.storedFrame,
        this.filledFrame,
        usedChunk,
        chunkToCopy + usedChunk
      );
      usedChunk += chunkToCopy;
      remaingFrame -= chunkToCopy;

      if (remaingFrame === 0) {
        this.storedFrame.copy(this.sendFrame, 0, 0, this.storedFrame.length);
        this.config.onFrame(this.sendFrame);
        this.filledFrame = 0;
        this.storedFrame.fill(0);
      }
    }

    console.log("");
    // while (availableChunk.length > this.frameSize) {
    //   const remaingFrame = this.frameSize - this.filledFrame;
    //   const chunkToCopy = Math.min(availableChunk.length, remaingFrame);
    //   const targetStart = this.filledFrame;
    //   const sourceStart = 0;
    //   const soundEnd = chunkToCopy;
    //   availableChunk.copy(this.storedFrame, targetStart, sourceStart, soundEnd);
    //   if (remaingFrame === 0) {
    //     this.storedFrame.copy(this.sendFrame, 0, 0, this.storedFrame.length);
    //     this.config.onFrame(this.sendFrame);
    //     this.filledFrame = 0;
    //     this.storedFrame.fill(0);
    //   }
    // }
    // this.pendingChunk = chunk.length;
    // while (this.pendingChunk > this.frameSize) {
    //   const chunkToCopy = Math.min(
    //     chunk.length,
    //     this.frameSize - this.filledFrame
    //   );
    // }
    // const chunkToCopy = Math.min(
    //   chunk.length,
    //   this.storedFrame.length - this.filledFrame
    // );
    // this.pendingChunk = chunk.length - chunkToCopy;
    // while(this.pendingChunk > this.)
    // chunk.copy(this.storedFrame, this.filledFrame, 0, chunkToCopy);
    // this.filledFrame += chunkToCopy;
    // const remaining = this.storedFrame.length - this.filledFrame;
    // if (remaining === 0) {
    //   this.storedFrame.copy(this.sendFrame, 0, 0, this.storedFrame.length);
    //   this.config.onFrame(this.sendFrame);
    //   this.filledFrame = 0;
    //   this.storedFrame.fill(0);
    // }
  }
}
