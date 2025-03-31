import * as vscode from "vscode";
import { getNowDirPath } from "../../keeper/now";
import {
  FF_PROBE_PATH,
  VIA_CLI_PATH,
  YT_DLP_CLI_PATH,
} from "../via-operations.constant";
import spawn from "cross-spawn";

const DOWNLOAD_VIDEO_EXIT_ERROR = "download video exit error";

type DownloadVideoOutput = {
  progress: number;
  videoPath: string;
};

export const downloadVideo = () => {
  return new Promise<void>(async (resolve, reject) => {
    const videoUrl = await vscode.window.showInputBox({
      placeHolder: "Enter video url",
    });

    if (!videoUrl) {
      return;
    }

    const outDir = getNowDirPath();

    const args = ["download-video", "-v", videoUrl, "-o", outDir];

    console.log(args);

    const child = spawn(VIA_CLI_PATH, args, {
      env: {
        YT_DLP_CLI_PATH,
        FF_PROBE_PATH,
      },
    });

    child.stdout?.on("data", async (data) => {
      const text = data.toString();
      console.log(text);
      //   const output = JSON.parse(text) as DownloadVideoOutput;
      //   console.log(output);
      //   const path = saveJsonFile(clipInfo, "clip-info.json");
      //   const doc = await vscode.workspace.openTextDocument(path);
      //   await vscode.window.showTextDocument(doc);
    });

    child.stderr?.on("data", (data) => {
      const text = data.toString();
      console.error(text);
    });

    child.on("close", async (code) => {
      if (code !== 0) {
        reject(DOWNLOAD_VIDEO_EXIT_ERROR);
      }

      resolve();
    });
  });
};
