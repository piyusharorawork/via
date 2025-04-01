import * as vscode from "vscode";
import { getNowDirPath } from "../../keeper/now";

import { join } from "path";
import { executeWithProgress } from "../execute-with-progress";
import { killCli, spawnViaCli } from "../via-cli";

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

  executeWithProgress({
    task: ({ onCancellationRequested, showProgress }) => {
      return new Promise<void>((resolve, reject) => {
        const child = spawnViaCli(args);

        onCancellationRequested(() => {
          killCli(child);
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
