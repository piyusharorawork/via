import { Canvas, invalidate, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Title } from "./elements/title";
import { VideoBackground } from "./elements/video-background";
import { VideoElement } from "@via/machine/generate-reel-machine";

type EditorSceneProps = {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  videoURL: string;
  text: string;
  fps: number;
  frames: number;
  width: number;
  height: number;
  videoElements: VideoElement[];

  onSelectElement: (element: VideoElement) => void;
  onUpdateElement: (element: VideoElement) => void;
};

const EditorScene = (props: EditorSceneProps) => {
  const [frame, setFrame] = useState(0);
  const { gl } = useThree();

  gl.domElement.addEventListener("webglcontextlost", function (event) {
    event.preventDefault();
    console.log("WebGL context lost, attempting to recover...");
  });

  return (
    <>
      <ControlFPS
        fps={props.fps}
        onFrame={() => {
          setFrame((frame) => (frame + 1) % (props.frames + 1));
        }}
      />
      {props.videoElements.map((videoElement) => {
        if (videoElement.type === "text") {
          return (
            <Title
              key={videoElement.id}
              text={videoElement.textInfo.text}
              initialPosition={videoElement.textInfo.position}
              color={videoElement.textInfo.color}
              fontSize={videoElement.textInfo.fontSize}
              font={videoElement.textInfo.font}
              onClick={() => props.onSelectElement(videoElement)}
              onPositionChanged={(position) => {
                props.onUpdateElement({
                  ...videoElement,
                  textInfo: {
                    ...videoElement.textInfo,
                    position,
                  },
                });
              }}
            />
          );
        }
        return null;
      })}

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
  videoElements: VideoElement[];

  onSelectElement: (element: VideoElement) => void;
  onUnselectAll: () => void;
  onUpdateElement: (element: VideoElement) => void;
};

export const VideoEditor = (props: VideoEditorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <Canvas
      frameloop="demand"
      ref={canvasRef}
      style={{ width: props.width, height: props.height }}
      gl={{ preserveDrawingBuffer: true, alpha: true }}
      onPointerMissed={() => props.onUnselectAll()}
    >
      <EditorScene
        canvasRef={canvasRef}
        text={props.text}
        videoURL={props.videoURL}
        fps={props.fps}
        frames={props.frames}
        width={props.width}
        height={props.height}
        videoElements={props.videoElements}
        onSelectElement={props.onSelectElement}
        onUpdateElement={props.onUpdateElement}
      />
    </Canvas>
  );
};
