"use client";

import { useCallback, useEffect, useState } from "react";
import { FrameController } from "./frame-controller";
import { useLoadVideo } from "@/lib/use-load-video";

export const Ui = () => {
  const [frame, setFrame] = useState(1);
  const [video, setVideo] = useState<HTMLVideoElement | null>(null);

  const FPS = 30;
  const FRAME_COUNT = 362;
  const WIDTH = 360;
  const HEIGHT = 640;

  const videoRef = useLoadVideo((video) => {
    setVideo(video);
  });

  useEffect(() => {
    if (!video) return;
    video.currentTime = frame / FPS;
  }, [frame]);

  return (
    <>
      <div className="flex justify-center">
        <video ref={videoRef} className={`w-[${WIDTH}px] h-[${HEIGHT}px]`}>
          <source src="https://test-v1.blr1.digitaloceanspaces.com/temp/10-counter.webm"></source>
        </video>
      </div>
      <div className="px-4 mt-8 flex flex-col gap-2">
        <FrameController
          onChange={(frame) => setFrame(frame)}
          frame={frame}
          frameCount={FRAME_COUNT}
        />
      </div>
    </>
  );
};
