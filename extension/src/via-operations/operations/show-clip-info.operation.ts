import * as vscode from "vscode";
import { saveJsonFile } from "../../keeper/keeper";
import { executeWithProgress } from "../execute-with-progress";
import { ViaSdk } from "../via-sdk/via-sdk";

export const showClipInfo = async () => {
  const videoPath = await vscode.window.showInputBox({
    placeHolder: "Enter video path",
  });

  if (!videoPath) return;

  executeWithProgress({
    task: ({ onCancellationRequested }) => {
      return new Promise<void>(async (resolve, reject) => {
        const viaSdk = new ViaSdk();
        onCancellationRequested(viaSdk.kill);
        const clipInfo = await viaSdk.getClipInfo(videoPath);
        const path = saveJsonFile(clipInfo, "clip-info.json");
        const doc = await vscode.workspace.openTextDocument(path);
        await vscode.window.showTextDocument(doc);
        resolve();
      });
    },
    title: "Fetching Clip Info",
  });
};
