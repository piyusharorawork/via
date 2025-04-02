import { createStore } from "@xstate/store";

const VIDEO_URL = "VIDEO_URL";
const CLIP_INFO = "CLIP_INFO";

type ClipInfo = {
  fps: number;
  frameCount: number;
  frameSize: { height: number; width: number };
};

type Context = {
  videoUrl: string | null;
  clipInfo: ClipInfo | null;
  frameNo: number;
};

const context: Context = {
  videoUrl: null,
  clipInfo: null,
  frameNo: 1,
};

export const videoAnalyserStore = createStore({
  context,
  on: {
    load: ({}) => {
      const videoUrl = getVideoUrlFromLocal();
      const clipInfo = getClipInfoFromLocal();

      return {
        clipInfo,
        videoUrl,
      };
    },
    submitVideoInfo: ({}, event: { videoUrl: string; clipInfo: string }) => {
      // TODO handle error and perform validation
      const clipInfoObj = JSON.parse(event.clipInfo) as ClipInfo;

      localStorage.setItem(VIDEO_URL, event.videoUrl);
      localStorage.setItem(CLIP_INFO, event.clipInfo);

      return {
        clipInfo: clipInfoObj,
        videoUrl: event.videoUrl,
      };
    },
    changeFrame: ({}, event: { frameNo: number }) => {
      return {
        frameNo: event.frameNo,
      };
    },
  },
});

const getVideoUrlFromLocal = () => {
  const videoUrlLocally = localStorage.getItem(VIDEO_URL);
  if (!videoUrlLocally) return null;

  return videoUrlLocally;
};

const getClipInfoFromLocal = () => {
  const clipInfoLocally = localStorage.getItem(CLIP_INFO);
  if (!clipInfoLocally) return null;

  try {
    const clipInfo = JSON.parse(clipInfoLocally);
    // TODO more validation of clip info via zod
    // Use try catch util
    return clipInfo as ClipInfo;
  } catch (_) {
    return null;
  }
};
