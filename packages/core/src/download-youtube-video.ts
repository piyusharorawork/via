import { exec } from "child_process";

export const downloadYoutubeVideo = (videoURL: string, videoPath: string) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      // TODO need to do it in config
      const downloader = `/Users/piyusharora/projects/audio-video-downloader/bin/yt-dlp_macos`;

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
