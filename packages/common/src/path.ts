import path from "path";
import { fileURLToPath } from "url";

const getPaths = () => {
  const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
  const __dirname = path.dirname(__filename); // get the name of the directory
  const assetsPath = path.join(__dirname, "../../../assets");
  return {
    sampleVideosPath: path.join(assetsPath, "sample-videos"),
    tempPath: path.join(assetsPath, "temp"),
    uploads: path.join(assetsPath, "uploads"),
  };
};

export const getTempFilePath = (fileName: string) => {
  const { tempPath } = getPaths();
  return path.join(tempPath, fileName);
};
