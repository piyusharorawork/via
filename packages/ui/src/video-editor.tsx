import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text, useVideoTexture } from "@react-three/drei";
import { useEffect, useState } from "react";
import { RGBAFormat, UnsignedByteType } from "three";

let pause: any;
const FPS = 60; // TODO need to get it from backend
const MAX_FRAMES = 300;
const WAIT_MS = 1000;

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

  useFrame(() => {
    console.log("rendering video background");
  });

  useEffect(() => {
    const videoElement: HTMLVideoElement = videoTexture.source.data;
    if (!videoElement) {
      return;
    }
    videoElement.pause();
  }, [videoTexture]);

  useEffect(() => {
    const videoElement: HTMLVideoElement = videoTexture.source.data;
    if (!videoElement) {
      return;
    }

    const timeToMove = props.frame / FPS;
    console.log(timeToMove);

    // videoElement.pause();

    videoElement.currentTime = timeToMove;
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

const RenderScene = (props: VideoEditorProps) => {
  const [frame, setFrame] = useState(0);

  const { gl, camera, scene, size, invalidate } = useThree();

  const width = size.width;
  const height = size.height;

  const startRecording = async () => {
    for (let i = 0; i < MAX_FRAMES; i++) {
      setFrame((frame) => frame + 1);
      gl.render(scene, camera);
      await sleep(WAIT_MS);
      const renderingContext = gl.getContext();
      const buffer = new Uint8Array(width * height * 4); // RGBA

      renderingContext.readPixels(
        0,
        0,
        width,
        height,
        RGBAFormat,
        UnsignedByteType,
        buffer
      );
      invalidate(); // only when you want to update the web gl frame counter
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
    <>
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
    </>
  );
};

export const VideoEditor = (props: VideoEditorProps) => {
  return (
    <Canvas frameloop="demand">
      <RenderScene {...props} />
    </Canvas>
  );
};
