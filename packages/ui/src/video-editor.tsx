import { Canvas, invalidate, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Title } from "./elements/title";
import { VideoBackground } from "./elements/video-background";

type EditorSceneProps = {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  videoURL: string;
  text: string;
  fps: number;
  frames: number;
  width: number;
  height: number;
};

const EditorScene = (props: EditorSceneProps) => {
  const [frame, setFrame] = useState(0);

  return (
    <>
      <ControlFPS
        fps={props.fps}
        onFrame={() => {
          setFrame((frame) => (frame + 1) % (props.frames + 1));
        }}
      />
      <Title text={props.text} />
      <VideoBackground
        fps={props.fps}
        frame={frame}
        videoURL={props.videoURL}
        width={props.width}
        height={props.height}
      />
    </>
  );
};

type ControlFPSProps = {
  fps: number;
  onFrame: () => void;
};

// This controls how fast we want to render a single frame
const ControlFPS = (props: ControlFPSProps) => {
  const { invalidate } = useThree();
  useEffect(() => {
    const interval = setInterval(() => {
      invalidate();
      props.onFrame();
    }, 1000 / props.fps);
    return () => clearInterval(interval);
  }, [props.fps, invalidate]);

  return null;
};

type VideoEditorProps = {
  videoURL: string;
  width: number;
  height: number;
  text: string;
  fps: number;
  frames: number;
};

export const VideoEditor = (props: VideoEditorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <Canvas
      frameloop="demand"
      ref={canvasRef}
      style={{ width: props.width, height: props.height }}
      gl={{ preserveDrawingBuffer: true, alpha: true }}
    >
      <EditorScene
        canvasRef={canvasRef}
        text={props.text}
        videoURL={props.videoURL}
        fps={props.fps}
        frames={props.frames}
        width={props.width}
        height={props.height}
      />
    </Canvas>
  );
};
