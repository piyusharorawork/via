"use client";

import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { useVideoTexture } from "@react-three/drei";
import { useSelector } from "@xstate/store/react";
import { store } from "@/store/store";

type Props = {
  videoUrl: string;
  fps: number;
};

export const VideoTextureFrame = (props: Props) => {
  return (
    <mesh>
      <planeGeometry args={[4.3, 7.9]} />
      <VideoTextureMaterial videoUrl={props.videoUrl} fps={props.fps} />
    </mesh>
  );
};

type VideoTextureMaterialProps = {
  videoUrl: string;
  fps: number;
};

const VideoTextureMaterial = (props: VideoTextureMaterialProps) => {
  const texture = useVideoTexture(props.videoUrl);
  const { invalidate } = useThree();
  const frame = useSelector(store, (state) => state.context.frame);

  useEffect(() => {
    const video = texture.source.data as HTMLVideoElement;

    video.onloadeddata = () => {
      video.currentTime = frame / props.fps;
      invalidate();
    };
  }, [props.videoUrl]);

  useEffect(() => {
    const video = texture.source.data as HTMLVideoElement;
    video.onseeked = () => {
      video.currentTime = frame / props.fps;
      invalidate();
    };
  }, [props.fps, frame]);

  return <meshBasicMaterial map={texture} />;
};
