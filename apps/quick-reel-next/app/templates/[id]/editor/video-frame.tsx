"use client";

import { useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Texture } from "three";

type Props = {
  videoUrl: string;
  frameNumber: number;
  fps: number;
};

export const VideoFrame = (props: Props) => {
  const textureRef = useRef<Texture>(new Texture());
  const videoRef = useRef<HTMLVideoElement>(document.createElement("video"));
  const { invalidate } = useThree();
  const [seeking, setSeeking] = useState(true);
  const [isFrameUpdated, setIsFrameUpdated] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    video.src = props.videoUrl;
    video.crossOrigin = "anonymous";
    video.preload = "auto";
    video.muted = true;
    video.playsInline = true;
    video.onloadeddata = () => setSeeking(false);
    video.oncanplay = () => video.pause();
  }, [props.videoUrl]);

  const updateFrame = async (video: HTMLVideoElement) => {
    video.currentTime = props.frameNumber / props.fps;
    const bitmap = await createImageBitmap(video);
    const texture = textureRef.current;
    texture.image = bitmap;
    texture.needsUpdate = true;
    invalidate();
    setIsFrameUpdated(true);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (seeking) return;
    if (!video.readyState) return;
    if (isFrameUpdated) return;

    video.addEventListener("seeking", () => setSeeking(true));
    video.addEventListener("seeked", () => setSeeking(false));

    updateFrame(video);
  }, [props.fps, props.frameNumber, videoRef.current, seeking]);

  useEffect(() => {
    setIsFrameUpdated(false);
  }, [props.frameNumber]);

  return (
    <mesh rotation={[0, 0, Math.PI]}>
      <planeGeometry args={[4.3, 7.9]} />
      <meshBasicMaterial map={textureRef.current} />
    </mesh>
  );
};
