import { File } from "@via/store/file-store";

export const formFileURL = (file: File) => {
  const videoURL = `http://localhost:4000${file.path}`;
  return videoURL;
};
