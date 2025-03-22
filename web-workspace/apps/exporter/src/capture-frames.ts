import { chromium } from "playwright";
import { takeScreenshot } from "./take-screenshot";
import { z } from "zod";
import { Options } from "./exporter.types";

const schema = z.object({
  videoWidth: z.string().transform((v) => parseInt(v)), // TODO enum of possible values
  videoHeight: z.string().transform((v) => parseInt(v)),
  pageUrl: z.string().url(),
  frameCount: z.string().transform((v) => parseInt(v)),
  framesDirPath: z.string(),
});

export const captureFrames = async (input: Options) => {
  try {
    const { frameCount, framesDirPath, videoWidth, pageUrl, videoHeight } =
      schema.parse(input);

    const browser = await chromium.launch({
      headless: true,
      devtools: false,
    });
    const page = await browser.newPage();
    page.route("**", (route) => route.continue());

    await page.setViewportSize({ width: videoWidth, height: videoHeight });
    await page.goto(pageUrl);
    console.log("loading page ...");
    await page.waitForTimeout(5000);
    console.log(`progress=5`);

    let completedFrameCount = 0;

    for (let frame = frameCount; frame >= 1; frame--) {
      await takeScreenshot({ frame, framesDirPath, page });
      completedFrameCount++;
      const progressPercentage = (completedFrameCount * 100) / frameCount;
      const amount = interpolateAmount(5, 99, progressPercentage);
      console.log(`progress=${amount}`);
    }

    await browser.close();
    console.log(`progress=${100}`);
  } catch (error) {
    console.error(error);
  }
};

const interpolateAmount = (
  low: number,
  high: number,
  progressPercentage: number
): number => {
  return Math.ceil(low + ((high - low) * progressPercentage) / 100);
};
