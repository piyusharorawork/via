import { exec } from "child_process";

type GenerateVideoInput = {
  videoPath: string;
  quote: string;
  generatedVideoPath: string;
};

export const generateVideo = async (input: GenerateVideoInput) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const { quote, videoPath, generatedVideoPath } = input;

      const cp = exec(
        `node /Users/piyusharora/projects/via/packages/core/dist/generate-video/edit-video-cli.js ${videoPath} ${quote} ${generatedVideoPath}`, // TODO PATH MODULE
        (err, stdout) => {
          if (err) {
            console.error(err);
            throw err;
          }

          console.log(stdout);
        }
      );

      cp.on("close", () => {
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
};
