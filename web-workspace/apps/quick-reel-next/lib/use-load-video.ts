import { useCallback } from "react";

export const useLoadVideo = (callback: (video: HTMLVideoElement) => void) => {
  return useCallback((video: HTMLVideoElement | null) => {
    if (!video) return;
    video.currentTime = 0;
    video.pause();
    callback(video);
  }, []);
};
