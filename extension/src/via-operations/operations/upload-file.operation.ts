import { executeWithProgress } from "../execute-with-progress";
import * as vscode from "vscode";
import { killCli, spawnViaCli } from "../via-cli";

type UploadFileOutput = {
  url: string;
};

export const uploadFile = async (filePath: string) => {
  executeWithProgress({
    task: ({ onCancellationRequested, showMessage }) => {
      return new Promise<void>(async (resolve, reject) => {
        const args = ["upload-file", "-f", filePath];
        const child = spawnViaCli(args);

        onCancellationRequested(() => {
          killCli(child);
        });

        child.stdout.on("data", async (data) => {
          const text = data.toString();
          const uploadFileOutput = JSON.parse(text) as UploadFileOutput;
          await vscode.env.clipboard.writeText(uploadFileOutput.url);
          showMessage("File uploaded and url copied to clipboard");
          await new Promise((resolve) => setTimeout(resolve, 500));
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
