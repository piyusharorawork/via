import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  createVideoAnalyserStore,
  Context,
  ClipInfo,
  VIDEO_URL,
  CLIP_INFO,
  getClipInfo,
} from "./store";
import { IStorage, MockStorage } from "./storage";

describe("create video analyser store", () => {
  let store: ReturnType<typeof createVideoAnalyserStore>;
  const storage = new MockStorage();

  beforeEach(() => {
    storage.clear();
    store = createVideoAnalyserStore(storage);
  });

  it("should initialize store with default values", () => {
    const expectedContext: Context = {
      clipInfoStr: "",
      frameNo: 0,
      videoUrl: "",
      videoElement: null,
    };

    expect(store.getSnapshot().context).toEqual(expectedContext);
  });

  it("should set the video url", () => {
    store.send({ type: "setVideoUrl", videoUrl: "http://video-url.mp4" });
    expect(store.getSnapshot().context.videoUrl).toEqual(
      "http://video-url.mp4"
    );
  });

  it("should set the clip info", () => {
    const clipInfo: ClipInfo = {
      fps: 30,
      frameCount: 362,
      frameSize: { height: 640, width: 360 },
    };
    store.send({ type: "setClipInfo", clipInfo: JSON.stringify(clipInfo) });
    expect(store.getSnapshot().context.clipInfoStr).toEqual(
      JSON.stringify(clipInfo)
    );
  });

  it("should set the frame no", () => {
    store.send({ type: "setFrameNo", frameNo: 10 });
    expect(store.getSnapshot().context.frameNo).toEqual(10);
  });

  it("should set the video element", () => {
    const videoElement = {} as HTMLVideoElement;
    store.send({ type: "setVideoElement", videoElement });
    expect(store.getSnapshot().context.videoElement).toEqual(videoElement);
  });

  // TODO requires local storage mocking
  it("should save the valid url and clip info", () => {
    store.send({ type: "setVideoUrl", videoUrl: "http://video-url.mp4" });
    store.send({
      type: "setClipInfo",
      clipInfo: JSON.stringify({
        fps: 30,
        frameCount: 362,
        frameSize: { height: 640, width: 360 },
      }),
    });

    store.send({ type: "saveVideoInfo" });
    expect(storage.getItem(VIDEO_URL)).toEqual("http://video-url.mp4");
    expect(storage.getItem(CLIP_INFO)).toEqual(
      JSON.stringify({
        fps: 30,
        frameCount: 362,
        frameSize: { height: 640, width: 360 },
      })
    );
  });
});

describe("get clip info", () => {
  it("should return null if clip info is not valid json", () => {
    const clipInfoStr = "invalid json";
    const clipInfo = getClipInfo(clipInfoStr);
    expect(clipInfo).toBeNull();
  });

  it("should return null if clip info is  valid json but not valid clip info object", () => {
    const obj = { name: "test" };
    const clipInfoStr = JSON.stringify(obj);
    const clipInfo = getClipInfo(clipInfoStr);
    expect(clipInfo).toBeNull();
  });
});
