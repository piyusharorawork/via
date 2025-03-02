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
    await page.setViewportSize({ width: videoWidth, height: videoHeight });
    await page.goto(pageUrl);
    await page.waitForTimeout(5000);

    for (let frame = frameCount; frame >= 1; frame--) {
      await takeScreenshot({ frame, framesDirPath, page });
    }

    await browser.close();
  } catch (error) {
    console.error(error);
  }
};
