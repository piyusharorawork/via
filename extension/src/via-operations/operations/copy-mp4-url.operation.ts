import * as vscode from "vscode";
import { executeWithProgress } from "../execute-with-progress";
import { killCli, spawnViaCli } from "../via-cli";

const COPY_MP4_EXIT_ERROR = "download video exit error";

type CopyMp4UrlOutput = {
  url: string;
};

export const copyMp4Url = async (webmPath: string) => {
  const args = ["copy-mp4-url", "-v", webmPath];

  executeWithProgress({
    task: ({ onCancellationRequested, showMessage }) => {
      return new Promise<void>((resolve, reject) => {
        const child = spawnViaCli(args);

        onCancellationRequested(() => {
          killCli(child);
        });

        child.stdout.on("data", async (data) => {
          const text = data.toString();
          const { url } = JSON.parse(text) as CopyMp4UrlOutput;
          await vscode.env.clipboard.writeText(url);
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
            reject(COPY_MP4_EXIT_ERROR);
          }
        });
      });
    },
    title: "Copying mp4 url",
  });
};
