import { store } from "@/store/store";
import { useCallback } from "react";

export const useLoadVideo = () => {
  return useCallback((video: HTMLVideoElement | null) => {
    if (!video) return;
    video.currentTime = 0;
    video.pause();
    store.send({ type: "setVideoElement", videoElement: video });
  }, []);
};
