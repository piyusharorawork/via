import { createStore } from "@xstate/store";

const VIDEO_URL = "VIDEO_URL";
const CLIP_INFO = "CLIP_INFO";

type ClipInfo = {
  fps: number;
  frameCount: number;
  frameSize: { height: number; width: number };
};

export type Context = {
  videoUrl: string;
  clipInfoStr: string;
  frameNo: number;
};

const getVideoUrlFromLocal = () => {
  const videoUrlLocally = localStorage.getItem(VIDEO_URL);
  if (!videoUrlLocally) return "";

  return videoUrlLocally;
};

const getClipInfoFromLocal = () => {
  const clipInfoLocally = localStorage.getItem(CLIP_INFO);
  if (!clipInfoLocally) return "";

  try {
    JSON.parse(clipInfoLocally);
    // TODO more validation of clip info via zod
    // Use try catch util
    return clipInfoLocally;
  } catch (_) {
    return "";
  }
};

export const createVideoAnalyserStore = () => {
  const videoUrl = getVideoUrlFromLocal();
  const clipInfoStr = getClipInfoFromLocal();

  const context: Context = {
    videoUrl,
    clipInfoStr,
    frameNo: 1,
  };

  const store = createStore({
    context,
    on: {
      saveVideoInfo: ({ clipInfoStr, videoUrl }) => {
        debugger;
        if (!clipInfoStr || !videoUrl) return {};

        // TODO use trycatch()
        try {
          JSON.parse(clipInfoStr);
        } catch (error) {
          console.error("cannot save (invalid clip info)");
          return {};
        }

        localStorage.setItem(VIDEO_URL, videoUrl);
        localStorage.setItem(CLIP_INFO, clipInfoStr);

        return {
          clipInfoStr,
          videoUrl,
        };
      },
      changeFrame: ({}, event: { frameNo: number }) => {
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
    },
  });

  const windowRef = window as any;
  windowRef.videoAnalyserStore = store;
  return store;
};

export const store = createVideoAnalyserStore();

export const getClipInfo = (clipInfoStr: string): ClipInfo | null => {
  try {
    const clipInfo = JSON.parse(clipInfoStr);
    // TODO more validation of clip info via zod
    // Use try catch util
    return clipInfo;
  } catch (_) {
    return null;
  }
};
