import { Canvas, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { utils } from "./utils";
import { VideoBackground } from "./elements/video-background";
import { Title } from "./elements/title";
import { services } from "./services";
import { VideoElement } from "@via/machine/generate-reel-machine";

const WAIT_MS = 50;

type RenderSceneProps = {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  frames: number;
  fps: number;
  videoURL: string;
  width: number;
  height: number;
  elements: VideoElement[];
  onFinish: (videoURL: string) => void;
  onProgress: (amount: number) => void;
};

const RenderScene = (props: RenderSceneProps) => {
  const [frame, setFrame] = useState(0);
  const ffmpegRef = useRef(new FFmpeg());

  const { gl, camera, scene, invalidate } = useThree();

  const startRecording = async () => {
    const ffmpeg = ffmpegRef.current;
    const videoUrl = await services.exportVideo({
      canvas: props.canvasRef.current,
      ffmpeg,
      fps: props.fps,
      frames: props.frames,
      camera,
      gl,
      invalidate,
      scene,
      onFrame: (frameNumber) => {
        const progressAmount = Math.floor((frameNumber / props.frames) * 100);
        props.onProgress(progressAmount);
        setFrame(frameNumber);
      },
    });
    props.onFinish(videoUrl);
  };

  useEffect(() => {
    startRecording();
    return () => {
      ffmpegRef.current.terminate();
    };
  }, []);
  return (
    <>
      {props.elements.map((element) => {
        if (element.type === "text") {
          return (
            <Title
              key={element.id}
              text={element.textInfo.text}
              color={element.textInfo.color}
              initialPosition={element.textInfo.position}
              fontSize={element.textInfo.fontSize}
              onClick={() => {}} // At the time of rendering , we dont allow selecting text
              onPositionChanged={() => {}} // At the time of rendering , we dont allow moving text
            />
          );
        }
        return null;
      })}

      <VideoBackground
        frame={frame}
        fps={props.fps}
        videoURL={props.videoURL}
        height={props.height}
        width={props.width}
      />
    </>
  );
};

type VideoRendererProps = {
  width: number;
  height: number;
  fps: number;
  frames: number;
  videoURL: string;
  elements: VideoElement[];
  onFinish: (videoURL: string) => void;
  onProgress: (amount: number) => void;
};

export const VideoRenderer = (props: VideoRendererProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  return (
    <Canvas
      ref={canvasRef}
      frameloop="demand"
      style={{
        width: props.width,
        height: props.height,
        visibility: "hidden",
        position: "fixed",
      }}
      gl={{ preserveDrawingBuffer: true, alpha: true }}
    >
      <RenderScene
        {...props}
        canvasRef={canvasRef}
        onProgress={props.onProgress}
        elements={props.elements}
      />
    </Canvas>
  );
};
