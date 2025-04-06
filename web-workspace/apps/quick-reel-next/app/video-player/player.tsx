"use client";

import { useSelector } from "@xstate/store/react";
import { useVideoPlayerStore } from "./video-player-store-provider";

export const Player = () => {
  const store = useVideoPlayerStore();
  const videoUrl = useSelector(store, (state) => state.context.videoUrl);

  if (videoUrl === "") return null;

  return (
    <div className="h-full flex justify-center py-3">
      <video controls className="h-full rounded-xl">
        <source src={videoUrl} />
      </video>
    </div>
  );
};
