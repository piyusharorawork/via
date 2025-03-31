import { spawn } from "child_process";
import * as vscode from "vscode";
import { saveJsonFile } from "../keeper/keeper";
import { getNowDirPath } from "../keeper/now";
import { downloadVideo } from "./download-video.operation";

const VIA_CLI_PATH = "/Users/piyusharora/projects/via/bin/via-cli";
const YT_DLP_CLI_PATH = "/Users/piyusharora/projects/via/bin/yt-dlp";
const FF_PROBE_PATH = "/Users/piyusharora/projects/via/bin/ffprobe";

type ClipInfoOutput = {
  fps: number;
  frameCount: number;
  frameSize: { height: number; width: number };
};

type DownloadVideoOutput = {
  progress: number;
  videoPath: string;
};

export const viaOperations = {
  showClipInfo: async () => {
    const videoPath = await vscode.window.showInputBox({
      placeHolder: "Enter video path",
    });

    if (!videoPath) {
      return;
    }

    const args = ["clip-info", "-v", videoPath];

    const child = spawn(VIA_CLI_PATH, args, {
      env: {
        YT_DLP_CLI_PATH: YT_DLP_CLI_PATH,
        FF_PROBE_PATH: FF_PROBE_PATH,
      },
    });

    child.stdout.on("data", async (data) => {
      const text = data.toString();
      const clipInfo = JSON.parse(text) as ClipInfoOutput;
      const path = saveJsonFile(clipInfo, "clip-info.json");
      const doc = await vscode.workspace.openTextDocument(path);
      await vscode.window.showTextDocument(doc);
    });

    child.stderr.on("data", (data) => {
      const text = data.toString();
      console.error(text);
    });

    child.on("close", async (code) => {});
  },

  downloadVideo,
};
