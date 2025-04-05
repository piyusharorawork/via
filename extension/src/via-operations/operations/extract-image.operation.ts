import * as vscode from "vscode";
import { getNowDirPath } from "../../keeper/now";
import path from "path";
import { executeWithProgress } from "../execute-with-progress";
import { killCli, spawnViaCli } from "../via-cli";

export const extractImage = async () => {
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

  const outDir = getNowDirPath();

  const outputFilePath = path.join(outDir, `frame-${frameNo}.png`);

  const args = [
    "extract-image",
    "-u",
    videoUrl,
    "-o",
    outputFilePath,
    "-f",
    frameNo,
  ];

  executeWithProgress({
    title: "Extracting frame",
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
