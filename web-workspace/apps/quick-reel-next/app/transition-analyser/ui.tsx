"use client";

import { useCallback, useEffect, useState } from "react";
import { FrameController } from "./frame-controller";
import { useLoadVideo } from "@/lib/use-load-video";

export const Ui = () => {
  const [frame, setFrame] = useState(1);
  const [video, setVideo] = useState<HTMLVideoElement | null>(null);

  const videoRef = useLoadVideo((video) => {
    setVideo(video);
  });

  useEffect(() => {
    if (!video) return;
    video.currentTime = frame / 30;
  }, [frame]);

  return (
    <>
      <div className="flex justify-center">
        <video ref={videoRef} className="w-[360px] h-[640px]">
          <source src="https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-cb69af81-109e-4786-97e5-bc156b6811cb/dcb6b4e9-b0b2-4a93-a2df-c977313f6ce1.webm"></source>
        </video>
      </div>
      <div className="px-4 mt-8 flex flex-col gap-2">
        <FrameController onChange={(frame) => setFrame(frame)} frame={frame} />
      </div>
    </>
  );
};
