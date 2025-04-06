"use client";

import React from "react";
import { createVideoPlayerStore } from "./video-player.store";
import { useStoreInit } from "@/lib/use-store.init";

const VideoPlayerStoreContext = React.createContext<ReturnType<
  typeof createVideoPlayerStore
> | null>(null);

type Props = {
  children: React.ReactNode;
};

export const VideoPlayerStoreProvider = (props: Props) => {
  const { isReady, store } = useStoreInit(createVideoPlayerStore);

  if (!isReady) {
    return null;
  }

  return (
    <VideoPlayerStoreContext.Provider value={store}>
      {props.children}
    </VideoPlayerStoreContext.Provider>
  );
};

export const useVideoPlayerStore = () => {
  const store = React.useContext(VideoPlayerStoreContext);
  if (!store) {
    throw new Error(
      "useVideoPlayerStore must be used within a VideoPlayerStoreProvider"
    );
  }
  return store;
};
