import { makeVideo } from "@via/video-maker/make-video";
import { join } from "path";
import { v4 as generateId } from "uuid";

export const createVideo = async (
  file: Express.Multer.File,
  text: string,
  duration: number
): Promise<string> => {
  const fileName = `${generateId()}.mp4`;

  await makeVideo({
    duration,
    height: 1920,
    masterVolume: 0.1,
    outPath: join("uploads", fileName),
    text,
    videoAssetPath: join("uploads", `${file.filename}`),
    width: 1080,
  });

  return `http://localhost:4000/${fileName}`;
};
