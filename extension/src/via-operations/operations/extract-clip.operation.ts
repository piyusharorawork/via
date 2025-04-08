import * as vscode from "vscode";
import { getNowDirPath } from "../../keeper/now";

import { join } from "path";
import { executeWithProgress } from "../execute-with-progress";
import { killCli, spawnViaCli } from "../via-cli";
import { prompt } from "../../prompt";

const EXTRACT_CLIP_EXIT_ERROR = "download video exit error";

export const extractClip = async () => {
  const videoUrl = await prompt.getInputStr("Enter video url");
  const startFrameNo = await prompt.getInputInt("Enter start frame no");
  const endFrameNo = await prompt.getInputInt("Enter end frame no");
  const fps = await prompt.getInputInt("Enter fps");
  const outDir = getNowDirPath();
  const outFilePath = join(
    outDir,
    `extracted-video-${startFrameNo}-${endFrameNo}.mp4`
  );

  const args = [
    "extract-clip",
    "-v",
    videoUrl,
    "-o",
    outFilePath,
    "-s",
    startFrameNo,
    "-e",
    endFrameNo,
    "-f",
    fps,
  ];

  executeWithProgress({
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
            reject(EXTRACT_CLIP_EXIT_ERROR);
          }
          const fileUri = vscode.Uri.file(outFilePath);
          await vscode.commands.executeCommand("vscode.open", fileUri);

          resolve();
        });
      });
    },
    title: "Extracting clip",
  });
};
