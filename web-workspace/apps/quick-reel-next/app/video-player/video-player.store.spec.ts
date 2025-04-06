import { describe, expect, it, beforeEach } from "vitest";
import {
  createVideoPlayerStore,
  VIDEO_PLAYER_URL_KEY,
} from "./video-player.store";
import { MockStorage } from "../../lib/storage";

describe("create video player store", () => {
  const storage = new MockStorage();

  beforeEach(() => {
    storage.clear();
  });

  it("should have default video url when storage is empty", () => {
    const store = createVideoPlayerStore(storage);
    expect(store.getSnapshot().context.videoUrl).toBe("");
  });

  it("should set the video url from storage", () => {
    storage.setItem(VIDEO_PLAYER_URL_KEY, "http://video-url.mp4");
    const store = createVideoPlayerStore(storage);
    expect(store.getSnapshot().context.videoUrl).toBe("http://video-url.mp4");
  });

  it("should set the video url in context on set video url", () => {
    const store = createVideoPlayerStore(storage);
    store.send({ type: "setVideoUrl", videoUrl: "http://video-url.mp4" });
    expect(store.getSnapshot().context.videoUrl).toBe("http://video-url.mp4");
  });

  it("should set the video url in storage on save", () => {
    const store = createVideoPlayerStore(storage);
    store.send({ type: "setVideoUrl", videoUrl: "http://video-url.mp4" });
    store.send({ type: "save" });
    const videoUrlFromLocal = storage.getItem(VIDEO_PLAYER_URL_KEY);
    expect(videoUrlFromLocal).toBe("http://video-url.mp4");
  });
});
