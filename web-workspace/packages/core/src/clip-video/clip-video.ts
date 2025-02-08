import { exec } from "child_process";

type ClipVideoInput = {
  videoPath: string;
  outputPath: string;
  from: number;
  to: number;
};

export const clipVideo = (input: ClipVideoInput) => {
  return new Promise<void>(async (resolve, reject) => {
    const command = `ffmpeg -i ${input.videoPath} -vf "select='between(n,${input.from},${input.to})',setpts=PTS-STARTPTS" -af "aselect='between(n,${input.from},${input.to})',asetpts=PTS-STARTPTS" -c:v libx264 -c:a aac ${input.outputPath}`;

    const cp = exec(command, (err, stdout) => {
      if (err) {
        console.error(err);
        return reject(err);
      }

      console.log(stdout);
    });

    cp.on("close", () => {
      resolve();
    });
  });
};
