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
  private videoBuffer: VideoBuffer | null;
  constructor(config: VideoReaderConfig) {
    this.config = config;
    this.myProcess = null;
    this.videoBuffer = null;
  }

  start(onFrame: (frame: Buffer, frameNumber: number) => void) {
    this.videoBuffer = new VideoBuffer({
      height: this.config.height,
      onFrame,
      width: this.config.width,
    });

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

    this.myProcess.stdout?.on("data", (chunk: Buffer) => {
      this.videoBuffer?.addChunk(chunk);
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

      videoReader.start(async (frame, frameNumber) => {
        await videoWriter.write(frame);
        if (frameNumber === 30) {
          await videoWriter.finish();
          resolve();
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

type VideoBufferConfig = {
  width: number;
  height: number;
  onFrame: (buffer: Buffer, frameNumber: number) => void;
};

export class VideoBuffer {
  // buffer to be store in between add chunk calls
  private storedFrame: Buffer;
  // buffer to be send to on frame
  private sendFrame: Buffer;

  private config: VideoBufferConfig;
  // buffer length till stored frames is filled
  private filledFrame = 0;

  private frameNumber = 0;

  //   // left over chunk remaning from
  //   private pendingChunk = Buffer.alloc(0);
  private frameSize: number;
  constructor(config: VideoBufferConfig) {
    this.frameSize = config.width * config.height * 4;
    this.storedFrame = Buffer.allocUnsafe(this.frameSize).fill(0);
    this.sendFrame = Buffer.allocUnsafe(this.frameSize).fill(0);
    this.config = config;
  }

  addChunk(chunk: Buffer) {
    let usedChunk = 0;

    while (usedChunk < chunk.length) {
      let remaingFrame = this.frameSize - this.filledFrame;
      const chunkToCopy = Math.min(chunk.length - usedChunk, remaingFrame);

      chunk.copy(
        this.storedFrame,
        this.filledFrame,
        usedChunk,
        chunkToCopy + usedChunk
      );
      usedChunk += chunkToCopy;
      this.filledFrame += chunkToCopy;
      remaingFrame -= chunkToCopy;

      if (remaingFrame === 0) {
        this.frameNumber++;
        this.storedFrame.copy(this.sendFrame, 0, 0, this.storedFrame.length);
        this.config.onFrame(this.sendFrame, this.frameNumber);
        this.filledFrame = 0;
        this.storedFrame.fill(0);
      }
    }
  }
}
