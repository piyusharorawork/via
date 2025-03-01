import { chromium, Page } from "playwright";
import { exec } from "child_process";
import path from "path";

const PAGE_URL = "http://localhost:3000/project";
const VIDEO_WIDTH = 360;
const VIDEO_HEIGHT = 640;
const FRAMES_FOLDER_PATH =
  "/Users/piyusharora/projects/via/assets/temp/rishikesh-frames";
const OUTPUT_PATH =
  "/Users/piyusharora/projects/via/assets/temp/rishikesh-output.mp4";
const FPS = 30;
const FRAME_COUNT = 422;

const captureFrames = async () => {
  const browser = await chromium.launch({
    headless: true,
    devtools: false,
  });
  const page = await browser.newPage();
  await page.setViewportSize({ width: VIDEO_WIDTH, height: VIDEO_HEIGHT });
  await page.goto(PAGE_URL);
  await page.waitForTimeout(5000);

  for (let i = FRAME_COUNT; i >= 1; i--) {
    await takeScreenshot(page, i);
  }

  await browser.close();
};

const takeScreenshot = async (page: Page, frame: number) => {
  await page.evaluate(async (frame) => {
    const win = window as any;
    win.store.send({ type: "changeFrame", frame });
    await new Promise((resolve) => setTimeout(resolve, 2));
  }, frame);

  await page.screenshot({
    path: `${FRAMES_FOLDER_PATH}/${frame}.png`,
  });

  console.log(`Frame ${frame}`);
};

const makeVideo = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const command = `ffmpeg -framerate ${FPS} -i "${path.join(FRAMES_FOLDER_PATH, "%d.png")}" -c:v libx264 -pix_fmt yuv420p "${OUTPUT_PATH}"`;

      console.log(command);

      // this is stuck for some reason
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error: ${error.message}`);
          return reject(error);
        }
        if (stderr) {
          console.error(`FFmpeg stderr: ${stderr}`);
          return reject(stderr);
        }
        console.log(stdout);
        return resolve();
      });
    } catch (error) {
      console.error(error);
    }
  });
};

(async () => {
  try {
    // await captureFrames();
    await makeVideo();
  } catch (error) {
    console.error();
  }
})();
