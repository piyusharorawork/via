import { useRef, useState } from "react";
import { Timeline } from "./timeline";

const videoInfo = {
  fps: 30,
  frameCount: 422,
  frameSize: {
    height: 1920,
    width: 1080,
  },
};

export default function VideoAnalyserPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [seeking, setSeeking] = useState(false);

  const updateFrame = (frame: number) => {
    if (!videoRef.current) return;
    if (seeking) return;

    videoRef.current.currentTime = frame / videoInfo.fps;
  };

  return (
    <div className="h-screen flex flex-col py-2 px-4">
      <video
        ref={videoRef}
        className="h-[640px]"
        preload="auto"
        onSeeking={() => setSeeking(true)}
        onSeeked={() => setSeeking(false)}
      >
        <source
          src="https://res.cloudinary.com/dmtxtgvsb/video/upload/v1736600178/hotel-highlight-reel-original.mp4"
          type="video/mp4"
        />
      </video>

      <Timeline frameCount={videoInfo.frameCount} onFrameChange={updateFrame} />
    </div>
  );
}
