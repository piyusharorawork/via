import fs from "fs";
import ytdl from "ytdl-core";
import path from "path";
import { v4 as generateId } from "uuid";
import { execSync } from "child_process";

export type DownloadVideoInput = {
  url: string;
  fileName: string;
  dirPath: string;
  start: string;
  end: string;
};

export const downloadYoutubeVideo = async (input: DownloadVideoInput) => {
  return new Promise<void>((resolve, reject) => {
    try {
      const isDirExist = fs.existsSync(input.dirPath);

      if (!isDirExist) {
        fs.mkdirSync(input.dirPath);
      }

      const filePath = path.join(input.dirPath, input.fileName);

      const file = fs.createWriteStream(filePath);

      const stream = ytdl(input.url, {});

      const writeStream = stream.pipe(file);

      stream.on("close", () => {
        console.log("stream close");
        resolve();
      });

      file.on("close", () => {
        console.log("file close");
        resolve();
      });

      writeStream.on("close", () => {
        console.log("write stream close");
        resolve();
      });

      writeStream.on("finish", () => {
        console.log("write stream finish");
        resolve();
      });

      // writeStream.on("finish", () => {
      //   const temp1Path = path.join("temp", `${generateId()}.mp4`);

      //   execSync(
      //     `ffmpeg -i ${filePath} -ss ${input.start} -to ${input.end} ${temp1Path}`
      //   );

      //   fs.unlinkSync(filePath);

      //   fs.renameSync(temp1Path, filePath);

      //   return resolve();
      // });
    } catch (error) {
      reject(error);
    }
  });
};
