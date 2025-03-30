import * as vscode from "vscode";
import { showClipInfo } from "./show-clip-info";
import { getBinPath } from "./path";
import { join } from "path";
import { downloadVideo } from "./download-video";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "via" is now active!');

  const viaCliPath = join(getBinPath(), "via-cli");

  const clipInfoCmd = vscode.commands.registerCommand(
    "via.show-clip-info",
    async () => {
      await showClipInfo(viaCliPath);
    }
  );

  const downloadVideoCmd = vscode.commands.registerCommand(
    "via.download-video",
    async () => {
      await downloadVideo(viaCliPath);
    }
  );

  context.subscriptions.push(clipInfoCmd);
  context.subscriptions.push(downloadVideoCmd);
}

export function deactivate() {}
