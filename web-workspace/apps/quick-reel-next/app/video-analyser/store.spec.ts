import { describe, it, expect, beforeEach, vi } from "vitest";
import { createVideoAnalyserStore, Context } from "./store";

describe("create video analyser store", () => {
  let store: ReturnType<typeof createVideoAnalyserStore>;

  beforeEach(() => {
    localStorage.clear();
    store = createVideoAnalyserStore();
  });

  it("should initialize store with default values", () => {
    const expectedContext: Context = {
      clipInfoStr: "",
      frameNo: 1,
      videoUrl: "",
    };

    expect(store.getSnapshot().context).toEqual(expectedContext);
  });

  it("should set the video url", () => {
    store.send({ type: "setVideoUrl", videoUrl: "http://video-url.mp4" });
    expect(store.getSnapshot().context.videoUrl).toEqual(
      "http://video-url.mp4"
    );
  });
});
