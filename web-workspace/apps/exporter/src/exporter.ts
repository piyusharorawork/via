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
      .option("-f, --fps [fps]", "FPS", "30")
      .option("-c, --frame-count [frame-count]", "Frame count", "422");

    program.parse();

    const options = program.opts<Options>();
    console.log(options);

    await captureFrames(options);
  } catch (error) {
    console.error();
  }
})();
