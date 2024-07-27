import { File } from "@via/store/file-store";

export const formFileURL = (filePath: string) => {
  const videoURL = `http://localhost:4000/${filePath}`;
  return videoURL;
};
