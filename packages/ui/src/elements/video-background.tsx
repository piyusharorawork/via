import { useVideoTexture } from "@react-three/drei";
import { useEffect } from "react";

type Props = {
  frame: number;
  fps: number;
  videoURL: string;
};

export const VideoBackground = (props: Props) => {
  const videoTexture = useVideoTexture(props.videoURL);
  const videoElement: HTMLVideoElement = videoTexture.source.data;
  if (!videoElement) {
    return;
  }
  videoElement.pause();

  useEffect(() => {
    const videoElement: HTMLVideoElement = videoTexture.source.data;
    if (!videoElement) {
      return;
    }

    const timeToMove = props.frame / props.fps;

    videoElement.currentTime = timeToMove;
  }, [props.frame]);

  return (
    <mesh>
      <planeGeometry attach="geometry" args={[4, 7.4]} />
      <meshBasicMaterial attach="material" map={videoTexture} />
    </mesh>
  );
};
