import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import * as vscode from "vscode";

export const spawnViaCli = (args: (string | number)[]) => {
  const strArgs = args.map((arg) => arg.toString());

  const config = vscode.workspace.getConfiguration("via");
  const viaCliPath = config.get<string>("viaCliPath");

  if (!viaCliPath || viaCliPath === "") {
    throw new Error("viaCliPath is empty");
  }

  const ffprobePath = config.get<string>("ffProbePath");
  if (!ffprobePath || ffprobePath === "") {
    throw new Error("ffprobePath is empty");
  }

  const ffmpegPath = config.get<string>("ffmpegPath");
  if (!ffmpegPath || ffmpegPath === "") {
    throw new Error("ffmpegPath is empty");
  }

  const ytDLPPath = config.get<string>("ytDLPPath");
  if (!ytDLPPath || ytDLPPath === "") {
    throw new Error("ytDLPPath is empty");
  }

  const spaceAccessKey = config.get<string>("spaceAccessKey");
  if (!spaceAccessKey || spaceAccessKey === "") {
    throw new Error("spaceAccessKey is empty");
  }

  const spaceSecretKey = config.get<string>("spaceSecretKey");
  if (!spaceSecretKey || spaceSecretKey === "") {
    throw new Error("spaceSecretKey is empty");
  }

  const spaceRegion = config.get<string>("spaceRegion");
  if (!spaceRegion || spaceRegion === "") {
    throw new Error("spaceRegion is empty");
  }

  const spaceName = config.get<string>("spaceName");
  if (!spaceName || spaceName === "") {
    throw new Error("spaceName is empty");
  }

  const tempDirPath = config.get<string>("tempDirPath");
  if (!tempDirPath || tempDirPath === "") {
    throw new Error("tempDirPath is empty");
  }

  const dbPath = config.get<string>("dbPath");
  if (!dbPath || dbPath === "") {
    throw new Error("dbPath is empty");
  }

  const child = spawn(viaCliPath, strArgs, {
    env: {
      FF_PROBE_PATH: ffprobePath,
      FFMPEG_PATH: ffmpegPath,
      YT_DLP_CLI_PATH: ytDLPPath,
      SPACE_ACCESS_KEY: spaceAccessKey,
      SPACE_SECRET_KEY: spaceSecretKey,
      SPACE_REGION: spaceRegion,
      SPACE_NAME: spaceName,
      TEMP_DIR_PATH: tempDirPath,
      DB_PATH: dbPath,
    },
  });

  return child;
};

export const killCli = (child: ChildProcessWithoutNullStreams) => {
  child.stdout.removeAllListeners();
  child.stderr.removeAllListeners();
  child.removeAllListeners();
  child.kill();
};
