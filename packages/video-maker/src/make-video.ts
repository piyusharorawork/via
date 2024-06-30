import { EditVideo } from "@via/editly";
import { execSync } from "child_process";
import { v4 as generateId } from "uuid";
import { join } from "path";

export type MakeVideoInput = {
  outPath: string;
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
    console.log("making video ...");
    console.log(JSON.stringify(input, null, 2));

    const temp1Path = join("temp", `${generateId()}.mp4`);

    execSync(
      `ffmpeg -i ${input.videoAssetPath} -ss 00:00:00 -to 00:00:0${input.duration} ${temp1Path}`
    );

    const temp2Path = join("temp", `${generateId()}.mp4`);

    await EditVideo({
      outPath: temp2Path,
      clips: [
        {
          layers: [
            {
              type: "video",
              path: temp1Path,
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

    execSync(
      `ffmpeg -i ${temp2Path} -y -af volume=${input.masterVolume} ${input.outPath}`
    );
  } catch (error) {
    throw error;
  }
};
