"use client";

import { videoAnalyserStore } from "@/store/video-analyser.store";
import { useSelector } from "@xstate/store/react";

type Props = {};

// https://chatgpt.com/c/67ed12bc-7c90-8006-9fcc-46ff332dd66c
export const FramePreview = (props: Props) => {
  const videoUrl = useSelector(
    videoAnalyserStore,
    (state) => state.context.videoUrl
  );

  if (!videoUrl) return null;

  return (
    <video className="absolute w-full h-full object-fit">
      <source src={videoUrl} />
    </video>
  );
};
