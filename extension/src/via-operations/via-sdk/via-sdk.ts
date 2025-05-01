import { ChildProcessWithoutNullStreams } from "child_process";
import { killCli, spawnViaCli } from "../via-cli";

export class ViaSdk {
  private child: ChildProcessWithoutNullStreams | null = null;

  kill() {
    if (this.child) {
      killCli(this.child);
    }
  }

  async getClipInfo(videoPath: string): Promise<{
    fps: number;
    frameCount: number;
    frameSize: { height: number; width: number };
  }> {
    const args = ["clip-info", "-v", videoPath];
    const result = await this.execute(args);
    return result;
  }

  async downloadVideo(
    websiteUrl: string,
    outputDir: string,
    onProgress: (progress: number) => void
  ) {
    const args = [
      "download-video",
      "-w",
      websiteUrl,
      "-d",
      outputDir,
      "-f",
      "video.mp4",
    ];
    await this.executeWithProgress(args, onProgress);
  }

  async fetchAllTemplates(): Promise<
    {
      id: string;
      name: string;
      videoUrl: string;
    }[]
  > {
    const args = ["fetch-all-templates"];
    const result = await this.execute(args);
    return result;
  }

  async createTemplate(
    websiteUrl: string,
    templateName: string
  ): Promise<void> {
    try {
      const args = ["create-template", "-u", websiteUrl, "-n", templateName];
      await this.execute(args);
    } catch (error) {
      console.log(error);
    }
  }

  private execute(args: string[]) {
    return new Promise<any>((resolve, reject) => {
      this.child = spawnViaCli(args);
      this.child.stdout.on("data", async (data) => {
        const text = data.toString();
        const output = JSON.parse(text);
        return resolve(output);
      });
      this.child.stderr.on("data", (data) => {
        const text = data.toString();
        return reject(text);
      });
      this.child.on("close", async (code) => {
        if (code !== 0) {
          return reject("non zero exit code");
        }
      });
    });
  }

  private executeWithProgress(
    args: string[],
    onProgress: (progress: number) => void
  ) {
    return new Promise<void>((resolve, reject) => {
      this.child = spawnViaCli(args);
      this.child.stdout.on("data", async (data) => {
        const text = data.toString();
        const output = JSON.parse(text);
        onProgress(output.progress);
      });

      this.child.stderr.on("data", (data) => {
        const text = data.toString();
        return reject(text);
      });

      this.child.on("close", async (code) => {
        if (code !== 0) {
          return reject("non zero exit code");
        }

        return resolve();
      });
    });
  }
}
