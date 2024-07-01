import { EditVideo } from "@via/editly";
import { execSync } from "child_process";
import { v4 as generateId } from "uuid";
import { join } from "path";
import fs from "fs";

export type MakeVideoInput = {
  dirPath: string;
  fileName: string;
  duration: number;
  videoAssetPath: string;
  text: string;
  width: number;
  height: number;
  masterVolume: number;
  bottomMargin: number;
  fontSize: number;
  textColor: string;
};

export const makeVideo = async (input: MakeVideoInput) => {
  try {
    // Cut the video with 1 seconds more
    const oneMoreSecVideoPath = join("temp", `${generateId()}.mp4`);

    // TODO fix start and end time
    execSync(
      `ffmpeg -i ${input.videoAssetPath} -ss 00:00:00 -to 00:00:0${input.duration + 1} ${oneMoreSecVideoPath}`
    );

    const backgroundVideoWithText = join("temp", `${generateId()}.mp4`);

    await EditVideo({
      outPath: backgroundVideoWithText,
      clips: [
        {
          layers: [
            {
              type: "video",
              path: oneMoreSecVideoPath,
            },
            {
              type: "subtitle",
              bottomMargin: input.bottomMargin,
              text: input.text,
              fontSize: input.fontSize,
              textColor: input.textColor,
            },
          ],
        },
      ],
      width: input.width,
      height: input.height,
      keepSourceAudio: true,
    });

    const isDirExist = fs.existsSync(input.dirPath);

    if (!isDirExist) {
      fs.mkdirSync(input.dirPath);
    }

    const filePath = join(input.dirPath, input.fileName);

    execSync(
      `ffmpeg -i ${backgroundVideoWithText} -y -af volume=${input.masterVolume} -ss 00:00:00 -to 00:00:0${input.duration} ${filePath}`
    );
  } catch (error) {
    throw error;
  }
};
