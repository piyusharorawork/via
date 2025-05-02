import * as vscode from "vscode";
import { downloadVideo } from "./operations/download-video.operation";
import { extractImage } from "./operations/extract-image.operation";
import { showClipInfo } from "./operations/show-clip-info.operation";
import { copyFileUrl } from "./operations/copy-file-url.operation";
import { copyMp4Url } from "./operations/copy-mp4-url.operation";
import { copyMutedUrl } from "./operations/copy-muted-url.operation";
import { compressVideo } from "./operations/compress-video.operation";
import { extractClip } from "./operations/extract-clip.operation";
import { extractCompressedImage } from "./operations/extract-compressed-image.operation";
import { downloadAudio } from "./operations/download-audio.operation";
import { copyKeyFrameEncodedUrl } from "./operations/copy-keyframe-encoded-url.operation";
import { executeWithProgress } from "./execute-with-progress";
import { ViaSdk } from "./via-sdk/via-sdk";
import { saveJsonFile } from "../keeper/keeper";
import { getNowDirPath } from "../keeper/now";
import { join } from "path";
import { title } from "process";

// TODO move it to via sdk
export const viaOperations = {
  copyFileUrl,
  extractImage,
  copyMp4Url,
  copyMutedUrl,
  compressVideo,
  extractClip,
  extractCompressedImage,
  downloadAudio,
  copyKeyFrameEncodedUrl,
};

export class ViaOperations {
  constructor() {}

  async showClipInfo() {
    const videoPath = await vscode.window.showInputBox({
      placeHolder: "Enter video path",
    });

    if (!videoPath) return;

    executeWithProgress({
      task: async ({ onCancellationRequested }) => {
        const viaSdk = new ViaSdk();
        onCancellationRequested(viaSdk.kill);
        const clipInfo = await viaSdk.getClipInfo(videoPath);
        const path = saveJsonFile(clipInfo, "clip-info.json");
        const doc = await vscode.workspace.openTextDocument(path);
        await vscode.window.showTextDocument(doc);
      },
      title: "Fetching Clip Info",
    });
  }

  async downloadVideo() {
    const websiteUrl = await vscode.window.showInputBox({
      placeHolder: "Enter website url containing video",
    });

    if (!websiteUrl) {
      return;
    }

    const outDir = getNowDirPath();

    executeWithProgress({
      task: async ({ onCancellationRequested, showProgress }) => {
        const viaSdk = new ViaSdk();
        onCancellationRequested(viaSdk.kill);
        await viaSdk.downloadVideo(websiteUrl, outDir, showProgress);
        const path = join(outDir, "video.mp4");
        const fileUri = vscode.Uri.file(path);
        await vscode.commands.executeCommand("vscode.open", fileUri);
      },
      title: "Downloading video",
    });
  }

  async fetchAllTemplates() {
    executeWithProgress({
      task: async ({ onCancellationRequested }) => {
        const viaSdk = new ViaSdk();
        onCancellationRequested(viaSdk.kill);
        const templates = await viaSdk.fetchAllTemplates();
        const path = saveJsonFile(templates, "templates.json");
        const doc = await vscode.workspace.openTextDocument(path);
        await vscode.window.showTextDocument(doc);
      },
      title: "Fetching templates",
    });
  }

  async createTemplate() {
    const websiteUrl = await vscode.window.showInputBox({
      placeHolder: "Enter website url containing video",
    });

    if (!websiteUrl) {
      return;
    }

    const templateName = await vscode.window.showInputBox({
      placeHolder: "Enter template name",
    });

    if (!templateName) {
      return;
    }

    executeWithProgress({
      task: async ({ onCancellationRequested, showProgress }) => {
        const viaSdk = new ViaSdk();
        onCancellationRequested(viaSdk.kill);
        await viaSdk.createTemplate(
          websiteUrl,
          templateName,
          (percent, message) => {
            showProgress(percent, message);
          }
        );
      },
      title: "Creating template",
    });
  }

  async viewTemplate() {
    executeWithProgress({
      task: async ({ onCancellationRequested }) => {
        const viaSdk = new ViaSdk();
        onCancellationRequested(viaSdk.kill);
        const templates = await viaSdk.fetchAllTemplates();
        const templateNames = templates.map((template) => template.name);
        const chosenTemplateName = await vscode.window.showQuickPick(
          templateNames
        );
        const template = templates.find(
          (template) => template.name === chosenTemplateName
        );
        if (!template) {
          return;
        }
        const templateId = template.id;
        const templateInfo = await viaSdk.getTemplate(templateId);
        const path = saveJsonFile(templateInfo, "template.json");
        const doc = await vscode.workspace.openTextDocument(path);
        await vscode.window.showTextDocument(doc);
      },
      title: "Viewing template",
    });
  }

  async removeTemplate() {
    executeWithProgress({
      task: async ({ onCancellationRequested }) => {
        const viaSdk = new ViaSdk();
        onCancellationRequested(viaSdk.kill);
        const templates = await viaSdk.fetchAllTemplates();
        const templateNames = templates.map((template) => template.name);
        const chosenTemplateName = await vscode.window.showQuickPick(
          templateNames
        );
        const template = templates.find(
          (template) => template.name === chosenTemplateName
        );
        if (!template) {
          return;
        }
        const templateId = template.id;
        await viaSdk.removeTemplate(templateId);
        vscode.window.showInformationMessage("Template removed");
      },
      title: "Removing template",
    });
  }
}
