import { exec } from "child_process";

type TrimVideoInput = {
  videoPath: string;
  start: number;
  end: number;
  outputPath: string;
};

export const trimVideo = async (input: TrimVideoInput) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const { videoPath, outputPath, end, start } = input;

      // TODO remove file also if exists

      const command = `ffmpeg -y -i ${videoPath} -ss 00:00:0${start} -to 00:00:0${end} ${outputPath}`;
      const cp = exec(command, (err, stdout) => {
        if (err) {
          console.error(err);
          throw err;
        }

        console.log(stdout);
      });

      cp.on("exit", () => {
        resolve();
      });

      cp.on("close", () => {
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
};
