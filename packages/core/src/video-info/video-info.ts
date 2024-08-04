import { execa } from "execa";

export class VideoInfo {
  private videoPath: string;
  constructor(videoPath: string) {
    this.videoPath = videoPath;
  }

  getFrameSize() {
    return new Promise<{ width: number; height: number }>(
      async (resolve, reject) => {
        try {
          const frameSizeProcess = execa("ffprobe", [
            "-v",
            "error",
            "-select_streams",
            "v:0",
            "-show_entries",
            "stream=width,height",
            "-of",
            "default=noprint_wrappers=1",
            `${this.videoPath}`,
          ]);
          frameSizeProcess.stdout?.on("data", (data: Buffer) => {
            const dataStr = data.toString();
            const widthMatch = dataStr.match(/width=(\d+)/);
            const heightMatch = dataStr.match(/height=(\d+)/);

            if (
              !widthMatch ||
              !widthMatch[1] ||
              !heightMatch ||
              !heightMatch[1]
            ) {
              return reject("no width and height found");
            }

            const widthStr = widthMatch[1];
            const heightStr = heightMatch[1];

            const width = parseInt(widthStr, 10);
            const height = parseInt(heightStr, 10);

            if (isNaN(width) || isNaN(height)) {
              throw "width and height not number";
            }

            return resolve({ width, height });
          });

          // ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of default=noprint_wrappers=1 /Users/piyusharora/projects/via/assets/sample-videos/1-sec.mp4
        } catch (error) {
          reject(error);
        }
      }
    );
  }

  getFrameCount() {
    return new Promise<number>(async (resolve, reject) => {
      try {
        // ffprobe -v error -count_frames -select_streams v:0 -show_entries stream=nb_read_frames -of default=nokey=1:noprint_wrappers=1 /Users/piyusharora/projects/via/assets/sample-videos/1-sec.mp4
        const args = [
          "-v",
          "error",
          "-count_frames",
          "-select_streams",
          "v:0",
          "-show_entries",
          "stream=nb_read_frames",
          "-of",
          "default=nokey=1:noprint_wrappers=1",
          `${this.videoPath}`,
        ];

        const frameCountProcess = execa("ffprobe", args);
        frameCountProcess.stdout?.on("data", (data: Buffer) => {
          const dataStr = data.toString();
          const frameCount = parseInt(dataStr);
          if (isNaN(frameCount)) {
            reject("frame count not number");
          }

          resolve(frameCount);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  getFPS() {
    return new Promise<string>(async (resolve, reject) => {
      try {
        //ffprobe -v error -select_streams v:0 -show_entries stream=r_frame_rate -of default=noprint_wrappers=1:nokey=1 /Users/piyusharora/projects/via/assets/sample-videos/1-sec.mp4
        const args = [
          "-v",
          "error",
          "-select_streams",
          "v:0",
          "-show_entries",
          "stream=r_frame_rate",
          "-of",
          "default=noprint_wrappers=1:nokey=1",
          `${this.videoPath}`,
        ];

        const frameCountProcess = execa("ffprobe", args);
        frameCountProcess.stdout?.on("data", (data: Buffer) => {
          const fps = data.toString().replace(/\n/g, "");
          resolve(fps);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}
