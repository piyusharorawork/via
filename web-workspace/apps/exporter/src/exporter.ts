import { chromium, Page } from "playwright";
import { exec } from "child_process";
import path from "path";
import { program } from "commander";
import { captureFrames } from "./capture-frames";
import { Options } from "./exporter.types";

(async () => {
  try {
    program
      .option(
        "-u, --page-url [page-url]",
        "Page url",
        "http://localhost:3000/project"
      )
      .option("-w, --video-width [video-width]", "Video width", "360")
      .option("-h, --video-height [video-height]", "Video height", "640")
      .option(
        "-d, --frames-dir-path [frames-dir-path]",
        "Frames dir path",
        "/Users/piyusharora/projects/via/assets/temp/rishikesh-frames"
      )
      .option(
        "-o, --output-path [output-path]",
        "Output path",
        "/Users/piyusharora/projects/via/assets/temp/rishikesh-video.mp4"
      )
      .option("-f, --fps [fps]", "FPS", "30")
      .option("-c, --frame-count [frame-count]", "Frame count", "100");

    program.parse();

    const options = program.opts<Options>();

    await captureFrames(options);
    // await makeVideo();
  } catch (error) {
    console.error();
  }
})();
