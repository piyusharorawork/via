import { createFileStore, File } from "@via/store/file-store";
import { createVideoStore } from "@via/store/video-store";
import { config } from "dotenv";

// export const getDatabaseName = (): string => {
//   config();
//   const databaseName = process.env.DATABASE_NAME;
//   if (!databaseName) {
//     throw "no database found in env!!";
//   }

//   return databaseName;
// };

export const getVideoStore = (databaseName: string) => {
  const videoStore = createVideoStore(databaseName);
  return videoStore;
};

export const getFileStore = (databaseName: string) => {
  const fileStore = createFileStore(databaseName);
  return fileStore;
};

export const formFileURL = (file: File) => {
  const videoURL = `http://localhost:4000${file.path}`;
  return videoURL;
};
