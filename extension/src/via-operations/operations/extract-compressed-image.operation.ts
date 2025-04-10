import * as vscode from "vscode";
import { getNowDirPath } from "../../keeper/now";
import path from "path";
import { executeWithProgress } from "../execute-with-progress";
import { killCli, spawnViaCli } from "../via-cli";

export const extractCompressedImage = async () => {
  const videoUrl = await vscode.window.showInputBox({
    placeHolder: "Enter video url",
  });

  if (!videoUrl) {
    return;
  }

  const frameNo = await vscode.window.showInputBox({
    placeHolder: "Enter frame number",
  });

  if (!frameNo) {
    return;
  }

  if (isNaN(Number(frameNo))) {
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

  const outputFilePath = path.join(
    outDir,
    `frame-${frameNo}-${resolution}.png`
  );

  const args = [
    "extract-compressed-image",
    "-v",
    videoUrl,
    "-o",
    outputFilePath,
    "-f",
    frameNo,
    "-r",
    resolution,
  ];

  console.log(args);

  executeWithProgress({
    title: "Extracting Compressed frame",
    task: ({ onCancellationRequested }) => {
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
            return reject("extract image exit error");
          }

          const fileUri = vscode.Uri.file(outputFilePath);
          await vscode.commands.executeCommand("vscode.open", fileUri);

          resolve();
        });
      });
    },
  });
};
