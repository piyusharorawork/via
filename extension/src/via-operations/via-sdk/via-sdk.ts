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
    onProgress: (percent: number, message: string) => void
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
    templateName: string,
    onProgress: (percent: number, message: string) => void
  ) {
    const args = ["create-template", "-u", websiteUrl, "-n", templateName];
    const result = await this.executeWithProgress(args, onProgress);
    return result;
  }

  async getTemplate(templateId: string): Promise<{
    id: string;
    name: string;
    websiteUrl: string;
    videoUrl: string;
    audioUrl: string;
    clipInfo: {
      fps: number;
      frameCount: number;
      frameWidth: number;
      frameHeight: number;
    };
    previewFrames: {
      frameNo: number;
      previewUrl: string;
    }[];
  }> {
    const args = ["get-template", "-t", templateId];
    const result = await this.execute(args);
    return result;
  }

  async removeTemplate(templateId: string): Promise<void> {
    const args = ["remove-template", "-t", templateId];
    await this.executeWithoutOutput(args);
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
    onProgress: (percent: number, message: string) => void
  ) {
    return new Promise<void>((resolve, reject) => {
      this.child = spawnViaCli(args);
      this.child.stdout.on("data", async (data) => {
        const text = data.toString();
        const output = JSON.parse(text);

        const percent = output.percent;
        const message = output.message || "";

        onProgress(percent, message);
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

  private executeWithoutOutput(args: string[]) {
    return new Promise<void>((resolve, reject) => {
      this.child = spawnViaCli(args);
      this.child.stdout.on("data", async (data) => {
        const text = data.toString();
        const output = JSON.parse(text);
        console.log("output", output);
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
