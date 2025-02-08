import { store } from "@/store/store";
import { useEffect, useRef } from "react";

const MIN_DIFF = 0.05; // 50 ms (in seconds)

export const useUpdateFrame = (
  videoRef: React.RefObject<HTMLVideoElement>,
  fps: number
) => {
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Pause the video so we can drive frame updates manually.
    video.pause();
    video.currentTime = 0;

    // Flag to prevent our update while the video is in a seeking state.
    let seeking = false;
    const handleSeeking = () => {
      seeking = true;
    };
    const handleSeeked = () => {
      seeking = false;
    };

    video.addEventListener("seeking", handleSeeking);
    video.addEventListener("seeked", handleSeeked);

    // We use a ref-like object to hold the latest frame value from our store.
    const latestFrameRef = { current: 0 };

    // Subscribe to your store and update the latest frame.
    const { unsubscribe } = store.subscribe((state) => {
      latestFrameRef.current = state.context.frame;
    });

    // Our animation frame loop updates the video’s currentTime if needed.
    let animationFrameId: number;
    const updateVideoFrame = () => {
      if (video && !seeking) {
        // Calculate the new time based on the frame number and fps.
        const newTime = latestFrameRef.current / fps;
        if (newTime - video.currentTime >= MIN_DIFF) {
          video.currentTime = newTime;
        }
      }
      animationFrameId = requestAnimationFrame(updateVideoFrame);
    };

    // Start the loop.
    animationFrameId = requestAnimationFrame(updateVideoFrame);

    // Cleanup: remove event listeners, cancel animation frame, and unsubscribe.
    return () => {
      video.removeEventListener("seeking", handleSeeking);
      video.removeEventListener("seeked", handleSeeked);
      cancelAnimationFrame(animationFrameId);
      unsubscribe();
    };
  }, [videoRef, fps]);
};
