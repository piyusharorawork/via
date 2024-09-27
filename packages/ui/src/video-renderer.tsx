import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text, useVideoTexture } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL, fetchFile } from "@ffmpeg/util";

const WAIT_MS = 50;

type VideoBackgroundProps = {
  frame: number;
  fps: number;
  videoURL: string;
};

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const VideoBackground = (props: VideoBackgroundProps) => {
  const videoTexture = useVideoTexture(props.videoURL);

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

type RenderSceneProps = {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  recording: boolean;
  frames: number;
  fps: number;
  videoURL: string;
  quote: string;
  onFinish: (videoURL: string) => void;
  onProgress: (amount: number) => void;
};

const RenderScene = (props: RenderSceneProps) => {
  const [frame, setFrame] = useState(0);
  const ffmpegRef = useRef(new FFmpeg());

  const load = async () => {
    const baseURL = "https://unpkg.com/@ffmpeg/core-mt@0.12.6/dist/esm";
    const ffmpeg = ffmpegRef.current;
    ffmpeg.on("log", ({ message }) => {
      console.log(message);
    });
    // toBlobURL is used to bypass CORS issue, urls with the same
    // domain can be used directly.
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        "application/wasm"
      ),
      workerURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.worker.js`,
        "text/javascript"
      ),
    });
  };

  const { gl, camera, scene, invalidate } = useThree();

  const getCanvasBlob = () => {
    return new Promise<Blob>((resolve, reject) => {
      const canvas = props.canvasRef.current;

      if (!canvas) {
        throw "no canvas found";
      }

      canvas.toBlob(
        (data) => {
          if (!data) {
            debugger;
            throw "no blob";
          }

          resolve(data);
        },
        "image/png",
        1
      );
    });
  };

  const startRecording = async () => {
    await load();
    const ffmpeg = ffmpegRef.current;
    //const frames: Blob[] = [];

    for (let i = 0; i < props.frames; i++) {
      setFrame((frame) => frame + 1);
      gl.render(scene, camera);
      await sleep(WAIT_MS);
      const pngBlob = await getCanvasBlob();
      const fileName = `input${i.toString().padStart(4, "0")}.png`;

      // TODO write it inside a folder
      await ffmpeg.writeFile(fileName, await fetchFile(pngBlob));
      const amount = Math.floor((i / props.frames) * 100);

      props.onProgress(amount);

      invalidate(); // only when you want to update the web gl frame counter
    }
    const outputFileName = "out.mp4";
    await ffmpeg.exec([
      "-framerate",
      `${props.fps}`,
      "-i",
      "input%04d.png",
      "-c:v",
      "libx264",
      "-pix_fmt",
      "yuv420p",
      outputFileName,
    ]);

    // // TODO Error handling
    const fileData = await ffmpeg.readFile(outputFileName);
    const data = new Uint8Array(fileData as ArrayBuffer);
    const videoBlob = new Blob([data.buffer], { type: "video/mp4" });
    const videoUrl = URL.createObjectURL(videoBlob);

    // TODO Delete that folder

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
      <Text
        position={[0, 3, 0]}
        fontSize={1}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {props.quote}
      </Text>
      <VideoBackground
        frame={frame}
        fps={props.fps}
        videoURL={props.videoURL}
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
