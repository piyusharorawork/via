import { makeVideo } from "@via/video-maker/make-video";
import { join } from "path";
import { v4 as generateId } from "uuid";

type CreateVideoInput = {
  file: Express.Multer.File;
  text: string;
  duration: number;
  resolution: Resolution;
  bottomMargin: number;
  fontSize: number;
  textColor: string;
  masterVolume: number;
};

type Resolution = "High" | "Medium" | "Low";

const getWidth = (resolution: Resolution): number => {
  const width = 1080;
  switch (resolution) {
    case "High":
      return width;

    case "Medium":
      return width / 2;

    case "Low":
      return width / 4;
  }
};

const getHeight = (resolution: Resolution): number => {
  const height = 1920;
  switch (resolution) {
    case "High":
      return height;

    case "Medium":
      return height / 2;

    case "Low":
      return height / 4;
  }
};

export const createVideo = async (input: CreateVideoInput): Promise<string> => {
  const fileName = `${generateId()}.mp4`;

  await makeVideo({
    duration: input.duration,
    height: getHeight(input.resolution),
    masterVolume: input.masterVolume,
    outPath: join("uploads", fileName),
    text: input.text,
    videoAssetPath: join("uploads", `${input.file.filename}`),
    width: getWidth(input.resolution),
    bottomMargin: input.bottomMargin,
    fontSize: input.fontSize,
    textColor: input.textColor,
  });

  return `http://localhost:4000/${fileName}`;
};
