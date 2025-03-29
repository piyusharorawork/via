import { join } from "path";
import { getNowDirPath } from "./now";
import { writeFileSync } from "fs";

export const saveJsonFile = (obj: object, fileName: string): string => {
  const nowDirPath = getNowDirPath();
  const filePath = join(nowDirPath, fileName);
  writeFileSync(filePath, JSON.stringify(obj, null, 2));
  return filePath;
};
