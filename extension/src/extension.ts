import * as vscode from "vscode";
import { downloadVideo } from "./download-video";
import { viaOperations } from "./via-operations/via-operations";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "via" is now active!');

  const clipInfoCmd = vscode.commands.registerCommand(
    "via.show-clip-info",
    async () => {
      await viaOperations.showClipInfo();
    }
  );

  const downloadVideoCmd = vscode.commands.registerCommand(
    "via.download-video",
    async () => {
      await viaOperations.downloadVideo();
    }
  );

  context.subscriptions.push(clipInfoCmd);
  context.subscriptions.push(downloadVideoCmd);
}

export function deactivate() {}
