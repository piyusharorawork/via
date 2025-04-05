"use client";
import React from "react";
import { createVideoAnalyserStore } from "../video-analyser/store";

type Props = {
  children: React.ReactNode;
};

const VideoAnalyserContext = React.createContext<ReturnType<
  typeof createVideoAnalyserStore
> | null>(null);

export const useVideoAnalyserStoreInit = () => {
  const storeRef = React.useRef<ReturnType<
    typeof createVideoAnalyserStore
  > | null>(null); // You can replace `any` with the actual return type
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    const { createVideoAnalyserStore } = require("../video-analyser/store");
    storeRef.current = createVideoAnalyserStore(localStorage);
    const windowRef = window as any;
    windowRef.videoAnalyserStore = storeRef.current;
    setIsReady(true);
  }, []);

  return {
    store: storeRef.current,
    isReady,
  };
};

export const VideoAnalyserProvider: React.FC<Props> = (props) => {
  const { isReady, store } = useVideoAnalyserStoreInit();

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
