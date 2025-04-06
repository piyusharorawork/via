import * as vscode from "vscode";
import { getNowDirPath } from "../../keeper/now";

import { join } from "path";
import { executeWithProgress } from "../execute-with-progress";
import { killCli, spawnViaCli } from "../via-cli";

const COMPRESS_VIDEO_EXIT_ERROR = "download video exit error";

export const compressVideo = async () => {
  const videoUrl = await vscode.window.showInputBox({
    placeHolder: "Enter video url",
  });

  if (!videoUrl) {
    return;
  }

  const resolution = await vscode.window.showQuickPick([
    "ULTRA_HD_2160p",
    "QUAD_HD_1440p",
    "FULL_HD_1080p",
    "HD_720p",
    "LOW_RES_HD_540p",
    "SD_480p",
    "VERY_LOW_SD_360p",
    "EXTREMELY_LOW_SD_240p",
    "ULTRA_LOW_SD_180p",
    "MINIMAL_SD_144p",
    "LOWEST_SD_120p",
    "BARE_MINIMUM_SD_90p",
  ]);

  if (!resolution) {
    return;
  }

  const outDir = getNowDirPath();
  const outFilePath = join(outDir, `video-${resolution}.mp4`);

  const args = [
    "compress-video",
    "-v",
    videoUrl,
    "-o",
    outFilePath,
    "-r",
    resolution,
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
          console.log(text);
        });

        child.stderr.on("data", (data) => {
          const text = data.toString();
          console.error(text);
        });

        child.on("close", async (code) => {
          if (code !== 0) {
            reject(COMPRESS_VIDEO_EXIT_ERROR);
          }
          const fileUri = vscode.Uri.file(outFilePath);
          await vscode.commands.executeCommand("vscode.open", fileUri);

          resolve();
        });
      });
    },
    title: "Compressing video",
  });
};
