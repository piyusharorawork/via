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
};

export const makeVideo = async (input: MakeVideoInput) => {
  try {
    const tempPath = join("temp", `${generateId()}.mp4`);

    await EditVideo({
      outPath: tempPath,
      clips: [
        {
          duration: input.duration,
          layers: [
            {
              type: "video",
              path: input.videoAssetPath,
            },
            {
              type: "subtitle",
              bottomMargin: 300,
              text: input.text,
            },
          ],
        },
      ],
      width: input.width,
      height: input.height,
      keepSourceAudio: true,
    });

    execSync(
      `ffmpeg -i ${tempPath} -y -af volume=${input.masterVolume} ${input.outPath}`
    );
  } catch (error) {
    throw error;
  }
};
