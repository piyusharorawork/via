import { IStorage } from "@/lib/storage";
import { createStore } from "@xstate/store";

export const VIDEO_PLAYER_URL_KEY = "VIDEO_PLAYER_URL";

type Context = {
  videoUrl: string;
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
      save: ({ videoUrl }) => {
        storage.setItem(VIDEO_PLAYER_URL_KEY, videoUrl);
        return {};
      },
    },
  });

  return store;
};

const createContext = (storage: IStorage): Context => {
  if (!storage) {
    return { videoUrl: "" };
  }

  const videoUrl = storage.getItem(VIDEO_PLAYER_URL_KEY);
  if (!videoUrl) {
    return { videoUrl: "" };
  }

  return { videoUrl };
};
