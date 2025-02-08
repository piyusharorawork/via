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

      const encodedQuote = encodeURI(quote);

      const cp = exec(
        `node /Users/piyusharora/projects/via/packages/core/dist/generate-video/execute-edit-video.js ${videoPath} ${encodedQuote} ${generatedVideoPath}`, // TODO PATH MODULE
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
