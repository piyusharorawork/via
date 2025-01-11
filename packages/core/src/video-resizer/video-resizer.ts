import { exec } from "child_process";
// medium : 960 X 540 export

export type VideoResolution =
  | "4K_ULTRA_HD_2160p"
  | "QUAD_HD_1440p"
  | "FULL_HD_1080p"
  | "HD_720p"
  | "LOW_RES_HD_540p"
  | "SD_480p"
  | "VERY_LOW_SD_360p"
  | "SUPER_LOW_SD_240p";
const resolutionMap: Record<
  VideoResolution,
  { width: number; height: number }
> = {
  "4K_ULTRA_HD_2160p": {
    height: 3840,
    width: 2160,
  },
  QUAD_HD_1440p: {
    height: 2560,
    width: 1440,
  },
  FULL_HD_1080p: {
    height: 1920,
    width: 1080,
  },
  HD_720p: {
    height: 1280,
    width: 720,
  },
  LOW_RES_HD_540p: {
    height: 960,
    width: 540,
  },
  SD_480p: {
    height: 854,
    width: 480,
  },
  VERY_LOW_SD_360p: {
    height: 640,
    width: 360,
  },
  SUPER_LOW_SD_240p: {
    height: 426,
    width: 240,
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
