import { spawn } from "child_process";
import { executeWithProgress } from "../execute-with-progress";
import * as vscode from "vscode";

type UploadFileOutput = {
  url: string;
};

export const uploadFile = async (filePath: string) => {
  executeWithProgress({
    task: ({ onCancellationRequested, showMessage }) => {
      return new Promise<void>(async (resolve, reject) => {
        const args = ["upload-file", "-f", filePath];
        const child = spawn(process.env.VIA_CLI_PATH!, args, {
          env: {
            FF_PROBE_PATH: process.env.FF_PROBE_PATH,
            YT_DLP_CLI_PATH: process.env.YT_DLP_CLI_PATH,
            FFMPEG_PATH: process.env.FFMPEG_PATH,
            SPACE_ACCESS_KEY: process.env.SPACE_ACCESS_KEY,
            SPACE_SECRET_KEY: process.env.SPACE_SECRET_KEY,
            SPACE_REGION: process.env.SPACE_REGION,
            SPACE_NAME: process.env.SPACE_NAME,
          },
        });

        onCancellationRequested(() => {
          child.stdout.removeAllListeners();
          child.stderr.removeAllListeners();
          child.removeAllListeners();
          child.kill();
        });

        child.stdout.on("data", async (data) => {
          const text = data.toString();
          const uploadFileOutput = JSON.parse(text) as UploadFileOutput;
          await vscode.env.clipboard.writeText(uploadFileOutput.url);
          showMessage("File uploaded and url copied to clipboard");
          resolve();
        });
        child.stderr.on("data", (data) => {
          const text = data.toString();
          console.error(text);
        });
        child.on("close", async (code) => {
          if (code !== 0) {
            return reject();
          }
        });
      });
    },
    title: "Fetching Clip Info",
  });
};
