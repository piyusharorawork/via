import * as vscode from "vscode";
import { saveJsonFile } from "../../keeper/keeper";
import { executeWithProgress } from "../execute-with-progress";
import { killCli, spawnViaCli } from "../via-cli";

type ClipInfoOutput = {
  fps: number;
  frameCount: number;
  frameSize: { height: number; width: number };
};

const DOWNLOAD_VIDEO_EXIT_ERROR = "download video exit error";

export const showClipInfo = async () => {
  const videoPath = await vscode.window.showInputBox({
    placeHolder: "Enter video path",
  });

  if (!videoPath) return;

  executeWithProgress({
    task: ({ onCancellationRequested }) => {
      return new Promise<void>(async (resolve, reject) => {
        const args = ["clip-info", "-v", videoPath];
        const child = spawnViaCli(args);

        onCancellationRequested(() => {
          killCli(child);
        });

        child.stdout.on("data", async (data) => {
          const text = data.toString();
          const clipInfo = JSON.parse(text) as ClipInfoOutput;
          const path = saveJsonFile(clipInfo, "clip-info.json");
          const doc = await vscode.workspace.openTextDocument(path);
          await vscode.window.showTextDocument(doc);
          resolve();
        });
        child.stderr.on("data", (data) => {
          const text = data.toString();
          console.error(text);
        });
        child.on("close", async (code) => {
          if (code !== 0) {
            return reject(DOWNLOAD_VIDEO_EXIT_ERROR);
          }
        });
      });
    },
    title: "Fetching Clip Info",
  });
};
