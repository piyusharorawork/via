"use client";
import { useEffect, useRef, useState } from "react";
import { VideoFrame } from "./video-frame";
import { Canvas } from "@react-three/fiber";

type Props = {
  frameNumber: number;
  fps: number;
};

export const EditorPreview = (props: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [seeking, setSeeking] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (seeking) return;

    video.currentTime = props.frameNumber / props.fps;
  }, [props.frameNumber, videoRef.current, props.fps]);

  return (
    <section id="editor-preview" className="grow flex justify-center ">
      <main className="aspect-[9/16] w-[300px] bg-red-100">
        <Canvas>
          <ambientLight />
          <VideoFrame
            frameNumber={props.frameNumber}
            fps={props.fps}
            videoUrl="https://res.cloudinary.com/dmtxtgvsb/video/upload/v1736600178/hotel-highlight-reel-original.mp4"
          />
        </Canvas>
      </main>
    </section>
  );
};
