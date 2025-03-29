import * as vscode from "vscode";
import { exec } from "child_process";
import { saveJsonFile } from "./keeper/keeper";

export const showClipInfo = async (viaCliPath: string) => {
  const videoPath = await vscode.window.showInputBox({
    placeHolder: "Enter video path",
  });

  if (!videoPath) {
    return;
  }

  const args = ["clip-info", "-v", videoPath];

  exec(viaCliPath + " " + args.join(" "), async (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }

    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }

    const clipInfo = JSON.parse(stdout);
    const path = saveJsonFile(clipInfo, "clip-info.json");
    const doc = await vscode.workspace.openTextDocument(path);
    await vscode.window.showTextDocument(doc);
  });
};
