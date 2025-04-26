import * as vscode from "vscode";
import { executeWithProgress } from "../execute-with-progress";
import { killCli, spawnViaCli } from "../via-cli";

const COPY_KEY_FRAME_ENCODED_URL_EXIT_ERROR = "keyframe exit error";

type CopyKeyframeEncodedUrlOutput = {
  url: string;
};

export const copyKeyFrameEncodedUrl = async (videoPath: string) => {
  const args = ["copy-keyframe-encoded-url", "-v", videoPath];

  executeWithProgress({
    task: ({ onCancellationRequested, showMessage }) => {
      return new Promise<void>((resolve, reject) => {
        const child = spawnViaCli(args);

        onCancellationRequested(() => {
          killCli(child);
        });

        child.stdout.on("data", async (data) => {
          const text = data.toString();
          const { url } = JSON.parse(text) as CopyKeyframeEncodedUrlOutput;
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
            reject(COPY_KEY_FRAME_ENCODED_URL_EXIT_ERROR);
          }
        });
      });
    },
    title: "Copying keyframe encoded url",
  });
};
