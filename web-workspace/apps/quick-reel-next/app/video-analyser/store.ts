import { tryCatchSync } from "../../lib/try-catch";
import { createStore } from "@xstate/store";
import { z } from "zod";
import { IStorage } from "./storage";

export const VIDEO_URL = "VIDEO_URL";
export const CLIP_INFO = "CLIP_INFO";

const clipInfoSchema = z.object({
  fps: z.number(),
  frameCount: z.number(),
  frameSize: z.object({
    height: z.number(),
    width: z.number(),
  }),
});

export type ClipInfo = z.infer<typeof clipInfoSchema>;

export type Context = {
  videoUrl: string;
  clipInfoStr: string;
  frameNo: number;
  videoElement: HTMLVideoElement | null;
};

const getVideoUrlFromLocal = (storage: IStorage) => {
  const videoUrlLocally = storage.getItem(VIDEO_URL);
  if (!videoUrlLocally) return "";

  return videoUrlLocally;
};

const getClipInfoFromLocal = (storage: IStorage) => {
  const clipInfoLocally = storage.getItem(CLIP_INFO);
  if (!clipInfoLocally) return "";

  const { error, data } = tryCatchSync(() => JSON.parse(clipInfoLocally));

  if (error !== null) return "";

  const { success } = clipInfoSchema.safeParse(data);

  if (!success) return "";

  return clipInfoLocally;
};

const updateVideoFrame = (
  videoElement: HTMLVideoElement | null,
  frameNo: number,
  clipInfo: ClipInfo | null
) => {
  if (!videoElement) return;
  if (!clipInfo) return;
  if (frameNo < 1 || frameNo > clipInfo.frameCount) return;
  videoElement.currentTime = (frameNo - 1) / clipInfo.fps;
};

const updateVideoSrc = (
  videoElement: HTMLVideoElement | null,
  videoUrl: string
) => {
  console.log("update video src");
  if (!videoElement) return;
  if (videoUrl === "") return;

  videoElement.pause(); // Stop current playback
  videoElement.srcObject = null; // Clear the current source object
  videoElement.removeAttribute("src"); // Clear the old source
  videoElement.load(); // Load the new source

  videoElement.src = videoUrl;
  videoElement.currentTime = 0;
  videoElement.load();
};

const createContext = (storage: IStorage): Context => {
  if (!storage) {
    return {
      videoUrl: "",
      clipInfoStr: "",
      frameNo: 0,
      videoElement: null,
    };
  }

  const videoUrl = getVideoUrlFromLocal(storage);
  const clipInfoStr = getClipInfoFromLocal(storage);

  const context: Context = {
    videoUrl,
    clipInfoStr,
    frameNo: 0,
    videoElement: null,
  };
  return context;
};

export const createVideoAnalyserStore = (storage: IStorage) => {
  const context = createContext(storage);

  const store = createStore({
    context,
    on: {
      // side effect
      saveVideoInfo: ({ clipInfoStr, videoUrl, videoElement }) => {
        if (!clipInfoStr || !videoUrl) return {};

        const { error, data } = tryCatchSync(() => JSON.parse(clipInfoStr));
        if (error !== null) {
          console.error("could not save a invalid json");
          return {};
        }

        const { success } = clipInfoSchema.safeParse(data);

        if (!success) {
          console.error("cannot save (invalid clip info)");
          return {};
        }

        updateVideoSrc(videoElement, videoUrl);

        storage.setItem(VIDEO_URL, videoUrl);
        storage.setItem(CLIP_INFO, clipInfoStr);

        return {
          frameNo: 0,
        };
      },
      setFrameNo: (
        { videoElement, clipInfoStr },
        event: { frameNo: number }
      ) => {
        const clipInfo = getClipInfo(clipInfoStr);
        updateVideoFrame(videoElement, event.frameNo, clipInfo);

        return {
          frameNo: event.frameNo,
        };
      },
      setVideoUrl: ({}, event: { videoUrl: string }) => {
        return {
          videoUrl: event.videoUrl,
        };
      },
      setClipInfo: ({}, event: { clipInfo: string }) => {
        return {
          clipInfoStr: event.clipInfo,
        };
      },
      setVideoElement: ({}, event: { videoElement: HTMLVideoElement }) => {
        return {
          videoElement: event.videoElement,
        };
      },
    },
  });

  return store;
};

export const getClipInfo = (clipInfoStr: string): ClipInfo | null => {
  const { error, data: obj } = tryCatchSync(() => JSON.parse(clipInfoStr));
  if (error !== null) return null;

  const { success, data } = clipInfoSchema.safeParse(obj);
  if (!success) return null;

  return data;
};
