import * as vscode from "vscode";
import { showClipInfo } from "./show-clip-info";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "via" is now active!');

  const viaCliPath =
    "/Users/piyusharora/projects/via/server-workspace/temp/via-cli";

  const disposable = vscode.commands.registerCommand(
    "via.show-clip-info",
    async () => {
      await showClipInfo(viaCliPath);
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
