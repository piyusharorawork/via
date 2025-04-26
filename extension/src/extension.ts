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
    }
  );

  const uploadFileCmd = vscode.commands.registerCommand(
    "via.copy-file-url",
    async (uri: vscode.Uri) => {
      await viaOperations.copyFileUrl(uri.fsPath);
    }
  );

  const extractImageCmd = vscode.commands.registerCommand(
    "via.extract-image",
    async () => {
      await viaOperations.extractImage();
    }
  );

  const copyMp4UrlCmd = vscode.commands.registerCommand(
    "via.copy-mp4-url",
    async (uri: vscode.Uri) => {
      await viaOperations.copyMp4Url(uri.fsPath);
    }
  );

  const copyMutedUrlCmd = vscode.commands.registerCommand(
    "via.copy-muted-url",
    async (uri: vscode.Uri) => {
      await viaOperations.copyMutedUrl(uri.fsPath);
    }
  );

  const compressVideoCmd = vscode.commands.registerCommand(
    "via.compress-video",
    async () => {
      await viaOperations.compressVideo();
    }
  );

  const extractClipCmd = vscode.commands.registerCommand(
    "via.extract-clip",
    async () => {
      await viaOperations.extractClip();
    }
  );

  const extractCompressedImageCmd = vscode.commands.registerCommand(
    "via.extract-compressed-image",
    async () => {
      await viaOperations.extractCompressedImage();
    }
  );

  const downloadAudioCmd = vscode.commands.registerCommand(
    "via.download-audio",
    async () => {
      await viaOperations.downloadAudio();
    }
  );

  const copyKeyframeEncodedUrlCmd = vscode.commands.registerCommand(
    "via.copy-keyframe-encoded-url",
    async (uri: vscode.Uri) => {
      await viaOperations.copyKeyFrameEncodedUrl(uri.fsPath);
    }
  );

  context.subscriptions.push(clipInfoCmd);
  context.subscriptions.push(downloadVideoCmd);
  context.subscriptions.push(uploadFileCmd);
  context.subscriptions.push(extractImageCmd);
  context.subscriptions.push(copyMp4UrlCmd);
  context.subscriptions.push(copyMutedUrlCmd);
  context.subscriptions.push(compressVideoCmd);
  context.subscriptions.push(extractClipCmd);
  context.subscriptions.push(extractCompressedImageCmd);
  context.subscriptions.push(downloadAudioCmd);
  context.subscriptions.push(copyKeyframeEncodedUrlCmd);
}

export function deactivate() {}
