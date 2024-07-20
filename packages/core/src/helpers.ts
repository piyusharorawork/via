import { createFileStore, File } from "@via/store/file-store";
import { createVideoStore } from "@via/store/video-store";

export const getDatabaseName = (): string => {
  const databaseName = process.env.DATABASE_NAME;
  if (!databaseName) {
    throw "no database found in env!!";
  }

  return databaseName;
};

export const getVideoStore = () => {
  const databaseName = getDatabaseName();
  const videoStore = createVideoStore(databaseName);
  return videoStore;
};

export const getFileStore = () => {
  const databaseName = getDatabaseName();
  const fileStore = createFileStore(databaseName);
  return fileStore;
};

export const formFileURL = (file: File) => {
  const videoURL = `http://localhost:4000${file.path}`;
  return videoURL;
};
