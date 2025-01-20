"use client";

import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { useVideoTexture } from "@react-three/drei";

type Props = {
  videoUrl: string;
  frameNumber: number;
  fps: number;
};

export const VideoTextureFrame = (props: Props) => {
  const texture = useVideoTexture(props.videoUrl);
  const { invalidate } = useThree();

  useEffect(() => {
    const video = texture.source.data as HTMLVideoElement;

    video.onloadeddata = () => {
      video.currentTime = props.frameNumber / props.fps;
      invalidate();
    };
  }, [props.videoUrl]);

  useEffect(() => {
    const video = texture.source.data as HTMLVideoElement;
    video.onseeked = () => {
      video.currentTime = props.frameNumber / props.fps;
      invalidate();
    };
  }, [props.fps, props.frameNumber]);

  return (
    <mesh>
      <planeGeometry args={[4.3, 7.9]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
};
