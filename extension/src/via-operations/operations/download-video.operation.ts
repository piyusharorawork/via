import * as vscode from "vscode";
import { getNowDirPath } from "../../keeper/now";
import {
  FF_PROBE_PATH,
  VIA_CLI_PATH,
  YT_DLP_CLI_PATH,
  FFMPEG_PATH,
} from "../via-operations.constant";
import { spawn } from "child_process";
import { join } from "path";
import { executeWithProgress } from "../execute-with-progress";

const DOWNLOAD_VIDEO_EXIT_ERROR = "download video exit error";

type DownloadVideoOutput = {
  progress: number;
};

export const downloadVideo = async () => {
  const websiteUrl = await vscode.window.showInputBox({
    placeHolder: "Enter website url containing video",
  });

  if (!websiteUrl) {
    return;
  }

  const outDir = getNowDirPath();

  const args = [
    "download-video",
    "-w",
    websiteUrl,
    "-d",
    outDir,
    "-f",
    "video.mp4",
  ];

  const child = spawn(VIA_CLI_PATH, args, {
    env: {
      YT_DLP_CLI_PATH,
      FF_PROBE_PATH,
      FFMPEG_PATH,
    },
  });

  executeWithProgress({
    task: ({ onCancellationRequested, showProgress }) => {
      return new Promise<void>((resolve, reject) => {
        onCancellationRequested(() => {
          child.stdout.removeAllListeners();
          child.stderr.removeAllListeners();
          child.removeAllListeners();
          child.kill();
        });
        child.stdout.on("data", async (data) => {
          const text = data.toString();
          const output = JSON.parse(text) as DownloadVideoOutput;
          showProgress(output.progress);
        });

        child.stderr.on("data", (data) => {
          const text = data.toString();
          console.error(text);
        });

        child.on("close", async (code) => {
          if (code !== 0) {
            reject(DOWNLOAD_VIDEO_EXIT_ERROR);
          }

          const path = join(outDir, "video.mp4");
          const fileUri = vscode.Uri.file(path);
          await vscode.commands.executeCommand("vscode.open", fileUri);

          resolve();
        });
      });
    },
    title: "Downloading video",
  });
};
