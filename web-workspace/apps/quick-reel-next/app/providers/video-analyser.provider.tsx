"use client";
import React from "react";
import { createVideoAnalyserStore } from "../video-analyser/store";
import { useStoreInit } from "@/lib/use-store.init";

type Props = {
  children: React.ReactNode;
};

const VideoAnalyserContext = React.createContext<ReturnType<
  typeof createVideoAnalyserStore
> | null>(null);

export const VideoAnalyserProvider: React.FC<Props> = (props) => {
  const { isReady, store } = useStoreInit(createVideoAnalyserStore);

  if (!isReady) {
    return null;
  }

  return (
    <VideoAnalyserContext.Provider value={store}>
      {props.children}
    </VideoAnalyserContext.Provider>
  );
};

export const useVideoAnalyserStore = () => {
  const store = React.useContext(VideoAnalyserContext);
  if (!store) {
    throw new Error(
      "useVideoAnalyserStore must be used within a VideoAnalyserProvider"
    );
  }
  return store;
};
