import { Button } from "@/components/ui/button";
import { PauseIcon, PlayIcon, SpinIcon } from "@/components/features/icons";
import { useEffect, useRef, useState } from "react";
import { store } from "@/store/store";
import { useSelector } from "@xstate/store/react";
import { PlayButtonIcon } from "./play-button-icon";
// import { useUpdateFrameNumber } from "./use-update-frame-number";

type Props = {
  fps: number;
};

export type VideoStatus = "paused" | "playing";

export const PlayButton = (props: Props) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoStatus = useSelector(store, (state) => state.context.videoStatus);

  // useUpdateFrameNumber(status, audioRef, props.fps);

  return (
    <section id="play-button" className="flex justify-center items-center">
      <audio
        ref={audioRef}
        preload="auto"
        src="https://res.cloudinary.com/dmtxtgvsb/video/upload/v1737252046/hotel-highlight-reel-1234-original.mp3"
      />
      <Button
        disabled={videoStatus === "not-ready"}
        className="w-16 relative"
        onClick={() => {
          const status = videoStatus === "playing" ? "paused" : "playing";
          store.send({ type: "setVideoStatus", status });
        }}
      >
        <PlayButtonIcon />
      </Button>
    </section>
  );
};
