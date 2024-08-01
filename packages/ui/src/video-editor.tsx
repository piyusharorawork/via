import { Canvas } from "@react-three/fiber";
import { Text, useVideoTexture } from "@react-three/drei";
import { useEffect, useState } from "react";

let pause: any;
const FPS = 60; // TODO need to get it from backend
const MAX_FRAMES = 300;
const WAIT_MS = 100;

type VideoBackgroundProps = {
  frame: number;
};

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const VideoBackground = (props: VideoBackgroundProps) => {
  const videoTexture = useVideoTexture(
    "http://localhost:4000/uploads/1722237708740.mp4"
  );

  useEffect(() => {
    const videoElement: HTMLVideoElement = videoTexture.source.data;
    if (!videoElement) {
      return;
    }

    videoElement.pause();
    videoElement.currentTime = props.frame / FPS;
  }, [props.frame]);

  return (
    <mesh>
      <planeGeometry attach="geometry" args={[4, 7.4]} />
      <meshBasicMaterial attach="material" map={videoTexture} />
    </mesh>
  );
};

type VideoEditorProps = {
  recording: boolean;
  onFinish: () => void;
};

export const VideoEditor = (props: VideoEditorProps) => {
  const [frame, setFrame] = useState(0);

  const startRecording = async () => {
    for (let i = 0; i < MAX_FRAMES; i++) {
      setFrame((frame) => frame + 1);
      await sleep(100);
    }
    props.onFinish();
  };

  useEffect(() => {
    if (!props.recording) {
      return;
    }

    startRecording();
  }, [props.recording]);

  return (
    <Canvas>
      <Text
        position={[0, 3, 0]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Hello
      </Text>
      <VideoBackground frame={frame} />
    </Canvas>
  );
};
