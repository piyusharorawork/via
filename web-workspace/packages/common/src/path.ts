import path from "path";
import { fileURLToPath } from "url";

export const getPaths = () => {
  const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
  const __dirname = path.dirname(__filename); // get the name of the directory
  const assetsPath = path.join(__dirname, "../../../assets");
  return {
    sampleVideosDirPath: path.join(assetsPath, "sample-videos"),
    tempDirPath: path.join(assetsPath, "temp"),
    uploadsDirPath: path.join(assetsPath, "uploads"),
    scriptsDirPath: path.join(assetsPath, "scripts"),
  };
};

export const getTempFilePath = (fileName: string) => {
  const { tempDirPath } = getPaths();
  return path.join(tempDirPath, fileName);
};

export const getSampleVideoFilePath = (fileName: string) => {
  const { sampleVideosDirPath } = getPaths();
  return path.join(sampleVideosDirPath, fileName);
};
