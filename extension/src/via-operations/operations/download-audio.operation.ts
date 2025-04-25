import * as vscode from "vscode";
import { getNowDirPath } from "../../keeper/now";

import { join } from "path";
import { executeWithProgress } from "../execute-with-progress";
import { killCli, spawnViaCli } from "../via-cli";

const DOWNLOAD_AUDIO_EXIT_ERROR = "download audio exit error";

type DownloadAudioOutput = {
  progress: number;
};

export const downloadAudio = async () => {
  const websiteUrl = await vscode.window.showInputBox({
    placeHolder: "Enter website url containing audio",
  });

  if (!websiteUrl) {
    return;
  }

  const outDir = getNowDirPath();

  const args = [
    "download-audio",
    "-w",
    websiteUrl,
    "-d",
    outDir,
    "-f",
    "audio.mp3",
  ];

  executeWithProgress({
    task: ({ onCancellationRequested, showProgress }) => {
      return new Promise<void>((resolve, reject) => {
        const child = spawnViaCli(args);

        onCancellationRequested(() => {
          killCli(child);
        });

        child.stdout.on("data", async (data) => {
          const text = data.toString();
          console.log(text);
          //   const output = JSON.parse(text) as DownloadAudioOutput;
          //   showProgress(output.progress);
        });

        child.stderr.on("data", (data) => {
          const text = data.toString();
          console.error(text);
        });

        child.on("close", async (code) => {
          console.log(code);
          if (code !== 0) {
            reject(DOWNLOAD_AUDIO_EXIT_ERROR);
          }

          const path = join(outDir, "audio.mp3");
          const fileUri = vscode.Uri.file(path);
          await vscode.commands.executeCommand("vscode.open", fileUri);
          resolve();
        });
      });
    },
    title: "Downloading audio",
  });
};
