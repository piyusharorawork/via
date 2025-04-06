"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useVideoPlayerStore } from "./video-player-store-provider";
import { useSelector } from "@xstate/store/react";

export const VideoForm = () => {
  const store = useVideoPlayerStore();
  const videoUrl = useSelector(store, (state) => state.context.videoUrl);

  return (
    <div className="flex flex-col px-3 py-6 gap-4">
      <Input
        value={videoUrl}
        onChange={(e) =>
          store.send({ type: "setVideoUrl", videoUrl: e.target.value })
        }
        placeholder="Enter video url"
      />
      <Button onClick={() => store.send({ type: "save" })}>Submit</Button>
    </div>
  );
};
