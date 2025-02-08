"use client";

import { PauseIcon, PlayIcon } from "@/components/features/icons";
import { Button } from "@/components/ui/button";
import { store } from "@/store/store";
import { Canvas, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { VideoTexture } from "three";

const updateFrame = (video: HTMLVideoElement | null) => {
  if (!video) return;
  let seeking = true;
  video.addEventListener("seeking", () => (seeking = true));
  video.addEventListener("seeked", () => (seeking = false));
  video.addEventListener("loadeddata", () => {
    video.currentTime = 1 / 30;
    seeking = false;
  });

  store.subscribe((snapshot) => {
    if (!video) return;
    video.currentTime = snapshot.context.frame / 30;
  });
};

export const VideoPreview = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <>
      <video
        ref={videoRef}
        className="aspect-[9/16] w-[300px] hidden"
        crossOrigin="anonymous"
      >
        <source src="https://res.cloudinary.com/dmtxtgvsb/video/upload/v1738046574/hotel-highlight-reel-hotel-highlight-reel-540p_kgksts.mp4" />
      </video>

      <PlayButton fps={30} />

      <Canvas frameloop="always">
        <ambientLight />
        <mesh>
          <planeGeometry args={[4.3, 7.9]} />
          <VideoMaterital videoRef={videoRef} />
        </mesh>
      </Canvas>
    </>
  );
};

type VideoMateritalProps = {
  videoRef: React.RefObject<HTMLVideoElement>;
};

const VideoMaterital = (props: VideoMateritalProps) => {
  if (!props.videoRef.current) return null;
  const { invalidate } = useThree();

  const texture = new VideoTexture(props.videoRef.current);
  updateFrame(props.videoRef.current);

  return <meshBasicMaterial map={texture} />;
};

type PlayButtonProps = {
  fps: number;
};

const PlayButton = (props: PlayButtonProps) => {
  const [status, setStatus] = useState<"paused" | "playing">("paused");
  const audioRef = useRef<HTMLAudioElement>(null);

  // useEffect(() => {
  //   if (status === "paused") {
  //     audioRef.current?.pause();
  //     return;
  //   }
  //   audioRef.current?.play();

  //   let animationFrameId: number | null = null;
  //   let lastTime = performance.now();

  //   const update = (currentTime: number) => {
  //     const timeElapsed = currentTime - lastTime;
  //     const frameDuration = 1000 / props.fps;
  //     if (timeElapsed > frameDuration) {
  //       store.send({ type: "incementFrame" });
  //       lastTime += frameDuration;
  //     }
  //     animationFrameId = requestAnimationFrame(update);
  //   };
  //   animationFrameId = requestAnimationFrame(update);

  //   return () => {
  //     if (animationFrameId === null) return;
  //     cancelAnimationFrame(animationFrameId);
  //   };
  // }, [status, props.fps, audioRef.current]);

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
