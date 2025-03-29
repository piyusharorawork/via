import * as vscode from "vscode";
import { showClipInfo } from "./show-clip-info";
import { getBinPath } from "./path";
import { join } from "path";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "via" is now active!');

  const viaCliPath = join(getBinPath(), "via-cli");

  const disposable = vscode.commands.registerCommand(
    "via.show-clip-info",
    async () => {
      await showClipInfo(viaCliPath);
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
