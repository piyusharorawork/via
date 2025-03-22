import { Page } from "playwright";

type TakeScreenshotInput = {
  page: Page;
  frame: number;
  framesDirPath: string;
};

export const takeScreenshot = async (input: TakeScreenshotInput) => {
  await input.page.evaluate(async (frame) => {
    const win = window as any;
    win.store.send({ type: "changeFrame", frame });
    await new Promise((resolve) => setTimeout(resolve, 2));
  }, input.frame);

  await input.page.screenshot({
    path: `${input.framesDirPath}/${input.frame}.png`,
  });
};
