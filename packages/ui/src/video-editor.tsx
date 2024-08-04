import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import { Text, useVideoTexture } from "@react-three/drei";

type VideoBackgroundProps = {
  videoURL: string;
};

const VideoBackground = (props: VideoBackgroundProps) => {
  const videoTexture = useVideoTexture(props.videoURL);

  return (
    <mesh>
      <planeGeometry attach="geometry" args={[4.3, 7.7]} />
      <meshBasicMaterial attach="material" map={videoTexture} />
    </mesh>
  );
};

type EditorSceneProps = {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  videoURL: string;
  text: string;
};

const EditorScene = (props: EditorSceneProps) => {
  return (
    <>
      <Text
        position={[0, 3, 0]}
        fontSize={1}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {props.text}
      </Text>
      <VideoBackground videoURL={props.videoURL} />
    </>
  );
};

type VideoEditorProps = {
  videoURL: string;
  width: number;
  height: number;
  text: string;
};

export const VideoEditor = (props: VideoEditorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <Canvas
      ref={canvasRef}
      style={{ width: props.width, height: props.height }}
      gl={{ preserveDrawingBuffer: true, alpha: true }}
    >
      <EditorScene
        canvasRef={canvasRef}
        text={props.text}
        videoURL={props.videoURL}
      />
    </Canvas>
  );
};
