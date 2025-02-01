import { store } from "@/store/store";
import throttle from "lodash.throttle";
import { useEffect } from "react";

const MIN_DIFF_MS = 0.05; // 50MS

export const useUpdateFrame = (
  videoRef: React.RefObject<HTMLVideoElement>,
  fps: number
) => {
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let seeking = true;

    const handleSeeking = () => {
      seeking = true;
    };

    const handleSeeked = () => {
      seeking = false;
    };

    const updateVideoTime = throttle((frame: number) => {
      if (!video || seeking) return;

      const newTime = frame / fps;
      const diff = Math.abs(video.currentTime - newTime);
      if (diff < MIN_DIFF_MS) return;
      video.currentTime = newTime;
    }, fps);

    video.addEventListener("seeking", handleSeeking);
    video.addEventListener("seeked", handleSeeked);

    video.currentTime = 0;

    store.subscribe((state) => {
      updateVideoTime(state.context.frame);
    });

    return () => {
      video.removeEventListener("seeking", handleSeeking);
      video.removeEventListener("seeked", handleSeeked);
    };
  }, [videoRef.current]);
};
