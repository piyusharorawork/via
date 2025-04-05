import { ChildProcessWithoutNullStreams, spawn } from "child_process";

export const spawnViaCli = (args: string[]) => {
  // TODO move it to settings for extension
  const child = spawn(process.env.VIA_CLI_PATH!, args, {
    env: {
      FF_PROBE_PATH: process.env.FF_PROBE_PATH,
      YT_DLP_CLI_PATH: process.env.YT_DLP_CLI_PATH,
      FFMPEG_PATH: process.env.FFMPEG_PATH,
      SPACE_ACCESS_KEY: process.env.SPACE_ACCESS_KEY,
      SPACE_SECRET_KEY: process.env.SPACE_SECRET_KEY,
      SPACE_REGION: process.env.SPACE_REGION,
      SPACE_NAME: process.env.SPACE_NAME,
      TEMP_DIR_PATH: process.env.TEMP_DIR_PATH,
      TEST_SAMPLES_DIR_PATH: process.env.TEST_SAMPLES_DIR_PATH,
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
