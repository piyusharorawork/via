import { exec } from "child_process";
// medium : 960 X 540 export

export const resizeVideo = async (
  videoPath: string,
  width: number,
  height: number,
  outputFilePath: string
) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const command = `ffmpeg -y -i ${videoPath} -vf "scale=${width}:${height}" -c:a copy ${outputFilePath}`;
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
