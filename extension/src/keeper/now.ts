import { existsSync, mkdirSync } from "fs";
import { join } from "path";
import moment from "moment";

export const getNowDirPath = (): string => {
  const rootPath = join(__dirname, "..", "..", "..");

  const logsPath = join(rootPath, "__logs");
  if (!existsSync(logsPath)) {
    mkdirSync(logsPath);
  }

  const dirName = moment().format("DD-MM-YYYY");
  const todayDirPath = join(logsPath, dirName);

  if (!existsSync(todayDirPath)) {
    mkdirSync(todayDirPath);
  }

  const formattedTime = moment().format("h:mm:ss_a");

  const nowDirPath = join(todayDirPath, formattedTime);

  if (!existsSync(nowDirPath)) {
    mkdirSync(nowDirPath);
  }

  return nowDirPath;
};
