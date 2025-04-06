import * as vscode from "vscode";
import { executeWithProgress } from "../execute-with-progress";
import { killCli, spawnViaCli } from "../via-cli";

const COPY_MUTED_URL_EXIT_ERROR = "download video exit error";

type CopyMutedUrlOutput = {
  url: string;
};

export const copyMutedUrl = async (videoPath: string) => {
  const args = ["copy-muted-url", "-v", videoPath];

  executeWithProgress({
    task: ({ onCancellationRequested, showMessage }) => {
      return new Promise<void>((resolve, reject) => {
        const child = spawnViaCli(args);

        onCancellationRequested(() => {
          killCli(child);
        });

        child.stdout.on("data", async (data) => {
          const text = data.toString();
          const { url } = JSON.parse(text) as CopyMutedUrlOutput;
          await vscode.env.clipboard.writeText(url);
          showMessage("Copied");
          resolve();
        });

        child.stderr.on("data", (data) => {
          const text = data.toString();
          console.error(text);
        });

        child.on("close", async (code) => {
          if (code !== 0) {
            reject(COPY_MUTED_URL_EXIT_ERROR);
          }
        });
      });
    },
    title: "Copying muted url",
  });
};
