import { IStorage } from "@/lib/storage";
import { updateVideoSrc } from "@/lib/video-element.util";
import { createStore } from "@xstate/store";

export const VIDEO_PLAYER_URL_KEY = "VIDEO_PLAYER_URL";

type Context = {
  videoUrl: string;
  videoElement: HTMLVideoElement | null;
};

export const createVideoPlayerStore = (storage: IStorage) => {
  const context = createContext(storage);
  const store = createStore({
    context,
    on: {
      setVideoUrl: ({}, event: { videoUrl: string }) => {
        return {
          videoUrl: event.videoUrl,
        };
      },
      save: ({ videoUrl, videoElement }) => {
        storage.setItem(VIDEO_PLAYER_URL_KEY, videoUrl);
        updateVideoSrc(videoElement, videoUrl);
        return {};
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

const createContext = (storage: IStorage): Context => {
  const videoUrl = getVideoUrlFromStorage(storage);
  return { videoUrl, videoElement: null };
};

const getVideoUrlFromStorage = (storage: IStorage): string => {
  if (!storage) return "";

  const videoUrl = storage.getItem(VIDEO_PLAYER_URL_KEY);
  if (!videoUrl) return "";

  return videoUrl;
};
