import { Button } from "@/components/ui/button";
import { PauseIcon, PlayIcon } from "@/components/features/icons";
import { useEffect, useRef, useState } from "react";

type Props = {
  fps: number;
  onIncrement: () => void;
};

export const PlayButton = (props: Props) => {
  const [status, setStatus] = useState<"paused" | "playing">("paused");
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (status === "paused") {
      audioRef.current?.pause();
      return;
    }
    audioRef.current?.play();

    let animationFrameId: number | null = null;
    let lastTime = performance.now();

    const update = (currentTime: number) => {
      const timeElapsed = currentTime - lastTime;
      const frameDuration = 1000 / props.fps;
      if (timeElapsed > frameDuration) {
        props.onIncrement();
        lastTime += frameDuration;
      }
      animationFrameId = requestAnimationFrame(update);
    };
    animationFrameId = requestAnimationFrame(update);

    return () => {
      if (animationFrameId === null) return;
      cancelAnimationFrame(animationFrameId);
    };
  }, [status, props.fps, audioRef.current]);

  return (
    <section id="play-button" className="flex justify-center items-center">
      <audio
        ref={audioRef}
        preload="auto"
        src="https://res.cloudinary.com/dmtxtgvsb/video/upload/v1737252046/hotel-highlight-reel-1234-original.mp3"
      />
      <Button
        className="w-16"
        onClick={() => {
          setStatus(status === "paused" ? "playing" : "paused");
        }}
      >
        {status === "paused" ? <PlayIcon /> : <PauseIcon />}
      </Button>
    </section>
  );
};
