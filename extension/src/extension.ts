import * as vscode from "vscode";
import { viaOperations } from "./via-operations/via-operations";
import * as dotenv from "dotenv";
import * as path from "path";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "via" is now active!');
  dotenv.config({ path: path.join(__dirname, "..", ".env") });

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
      console.log("done");
    }
  );

  const uploadFileCmd = vscode.commands.registerCommand(
    "via.upload-file",
    async (uri: vscode.Uri) => {
      await viaOperations.uploadFile(uri.fsPath);
    }
  );

  context.subscriptions.push(clipInfoCmd);
  context.subscriptions.push(downloadVideoCmd);
  context.subscriptions.push(uploadFileCmd);
}

export function deactivate() {}
