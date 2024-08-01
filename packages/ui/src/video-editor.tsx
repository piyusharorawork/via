import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text, useVideoTexture } from "@react-three/drei";
import { useEffect, useState } from "react";
import { RGBAFormat, UnsignedByteType } from "three";

let pause: any;
const FPS = 60; // TODO need to get it from backend
const MAX_FRAMES = 300;
const WAIT_MS = 50;

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

const RenderScene = (props: VideoEditorProps) => {
  const [frame, setFrame] = useState(0);

  const { gl, size, camera, scene, invalidate } = useThree();

  const render = async () => {
    for (let i = 1; i < 100; i++) {
      gl.render(scene, camera);
      await sleep(1000);
      invalidate();
    }
  };

  useEffect(() => {
    render();
  }, []);

  useFrame(({ gl, scene, camera }) => {
    console.log("running");
    // gl.render(scene, camera);
    // const width = size.width;
    // const height = size.height;
    // const buffer = new Uint8Array(width * height * 4); // 4 components per pixel (RGBA)

    // gl.getContext().readPixels(
    //   0,
    //   0,
    //   100,
    //   100,
    //   RGBAFormat,
    //   UnsignedByteType,
    //   buffer
    // );

    // console.log(buffer);
  });

  const startRecording = async () => {
    for (let i = 0; i < MAX_FRAMES; i++) {
      setFrame((frame) => frame + 1);
      await sleep(WAIT_MS);
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
