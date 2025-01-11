import { exec } from "child_process";
import path from "path";

export const downloadYoutubeVideo = (videoURL: string, videoPath: string) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      // TODO need to do it in config
      const downloader = path.join(
        path.resolve(),
        "../../",
        "bin/mac/yt-dlp_macos"
      );

      exec(
        `${downloader} -f mp4 -o ${videoPath} ${videoURL}`,
        (err, stdout) => {
          if (err) {
            console.error(err);
            return reject(err);
          }

          if (stdout.includes("100% of ")) {
            resolve();
          }
        }
      );
    } catch (error) {
      reject(error);
    }
  });
};

export const downloadAudioFromVideo = (videoURL: string, audioPath: string) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      // TODO need to do it in config
      const downloader = path.join(
        path.resolve(),
        "../../",
        "bin/mac/yt-dlp_macos"
      );

      exec(
        `${downloader} -x --audio-format mp3 -o ${audioPath} ${videoURL}`,
        (err, stdout) => {
          if (err) {
            console.error(err);
            return reject(err);
          }

          if (stdout.includes("100% of ")) {
            resolve();
          }
        }
      );
    } catch (error) {
      reject(error);
    }
  });
};
type CombineVideoAudioInput = {
  videoPath: string;
  audioPath: string;
  outputPath: string;
};

export const combineVideoAudio = (input: CombineVideoAudioInput) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const { videoPath, outputPath, audioPath } = input;

      // TODO remove file also if exists

      const command = `ffmpeg -y -i ${videoPath} -i ${audioPath} -c:v copy -c:a aac ${outputPath}`;
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
