import { exec } from "child_process";
// medium : 960 X 540 export

export type VideoResolution =
  | "ULTRA_LOW"
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "ULTRA_HIGH";

const resolutionMap: Record<
  VideoResolution,
  { width: number; height: number }
> = {
  ULTRA_HIGH: {
    height: 1920,
    width: 1080,
  },
  HIGH: {
    height: 1280,
    width: 720,
  },
  MEDIUM: {
    height: 960,
    width: 540,
  },
  LOW: {
    height: 640,
    width: 360,
  },
  ULTRA_LOW: {
    height: 320,
    width: 180,
  },
};

type ResizeVideoInput = {
  videoPath: string;
  resolution: VideoResolution;
  outputFilePath: string;
};

export const resizeVideo = async (input: ResizeVideoInput) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const { outputFilePath, resolution, videoPath } = input;
      const dimenstions = resolutionMap[resolution];
      const command = `ffmpeg -y -i ${videoPath} -vf "scale=${dimenstions.width}:${dimenstions.height}" -c:a copy ${outputFilePath}`;
      const cp = exec(command, (err, stdout) => {
        if (err) {
          console.error(err);
          throw err;
        }

        console.log(stdout);
      });

      cp.on("close", () => {
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
};
