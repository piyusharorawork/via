import { test, describe, expect } from "vitest";
import { getSampleVideoFilePath } from "@via/common/path";
import { VideoInfo } from "./video-info";

describe("video info", () => {
  const tenSecCountDownVideo = getSampleVideoFilePath("10-sec-count-down.mp4");
  const videoInfo = new VideoInfo(tenSecCountDownVideo);

  test("frame size", async () => {
    const { height, width } = await videoInfo.getFrameSize();
    expect(height).toBe(1280);
    expect(width).toBe(720);
  });

  test("frame count", async () => {
    const frameCount = await videoInfo.getFrameCount();
    expect(frameCount).toBe(351);
  });

  test("fps", async () => {
    const fps = await videoInfo.getFPS();
    expect(fps).toBe("30/1");
  });
});
