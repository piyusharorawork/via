import * as vscode from "vscode";
import { getNowDirPath } from "./keeper/now";
import { join } from "path";
import { spawn } from "child_process";

// TODO this needs to be saved in settings
const YT_DLP_CLI_PATH = "/Users/piyusharora/projects/via/bin/yt-dlp";

export const downloadVideo = async (viaCliPath: string) => {
  const videoUrl = await vscode.window.showInputBox({
    placeHolder: "Enter video url",
  });

  if (!videoUrl) {
    return;
  }

  const nowPath = getNowDirPath();

  const args = ["download-video", "-v", videoUrl, "-o", nowPath];

  const child = spawn(viaCliPath, args, {
    env: {
      YT_DLP_CLI_PATH: YT_DLP_CLI_PATH,
    },
  });
  // Working
  child.stdout.on("data", (data) => {
    const text = data.toString();
    console.log(text);
  });

  child.stderr.on("data", (data) => {
    const text = data.toString();
    console.error(text);
  });

  child.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
  });

  // await vscode.window.withProgress(
  //   {
  //     location: vscode.ProgressLocation.Notification,
  //     title: "Downloading video...",
  //     cancellable: false,
  //   },
  //   async (progress, token) => {
  //     progress.report({ increment: 0 });

  //     // const command =
  //     //   `YT_DLP_CLI_PATH=/Users/piyusharora/projects/via/bin/yt-dlp ${viaCliPath} ` +
  //     //   args.join(" ");

  //     // console.log(command);

  //     // exec(
  //     //   `YT_DLP_CLI_PATH=/Users/piyusharora/projects/via/bin/yt-dlp" ${viaCliPath} ` +
  //     //     args.join(" "),
  //     //   async (error, stdout, stderr) => {
  //     //     if (error) {
  //     //       console.error(`exec error: ${error}`);
  //     //       return;
  //     //     }

  //     //     if (stderr) {
  //     //       console.error(`stderr: ${stderr}`);
  //     //       return;
  //     //     }

  //     //     console.log(`stdout: ${stdout}`);
  //     //     // progress.report({ increment: 100 });

  //     //     // const openPath = vscode.Uri.file(outputPath);
  //     //     // await vscode.commands.executeCommand("vscode.open", openPath);
  //     //   }
  //     // );
  //   }
  // );
};
