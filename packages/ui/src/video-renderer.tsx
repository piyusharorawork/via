import { Canvas, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { utils } from "./utils";
import { VideoBackground } from "./elements/video-background";
import { Title } from "./elements/title";
import { services } from "./services";

const WAIT_MS = 50;

type RenderSceneProps = {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  recording: boolean;
  frames: number;
  fps: number;
  videoURL: string;
  quote: string;
  width: number;
  height: number;
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
    if (!props.recording) {
      return;
    }

    startRecording();
  }, [props.recording]);
  return (
    <>
      <Title text={props.quote} />
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
  recording: boolean;
  width: number;
  height: number;
  fps: number;
  frames: number;
  videoURL: string;
  quote: string;
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
      />
    </Canvas>
  );
};