"use client";

import { useSelector } from "@xstate/store/react";
import { useVideoAnalyserStore } from "../providers/video-analyser.provider";
import { useLoadVideo } from "@/lib/use-load-video";

// https://chatgpt.com/c/67ed12bc-7c90-8006-9fcc-46ff332dd66c
export const FramePreview = () => {
  const store = useVideoAnalyserStore();
  const videoUrl = useSelector(store, (state) => state.context.videoUrl);
  const videoRef = useLoadVideo((videoElement) => {
    store.send({ type: "setVideoElement", videoElement });
  });

  if (!videoUrl) return null;

  return (
    <div className="py-2">
      <video ref={videoRef} className="absolute w-full h-full object-fit">
        <source src={videoUrl} />
      </video>
    </div>
  );
};
