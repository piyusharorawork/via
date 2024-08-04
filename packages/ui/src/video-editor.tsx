import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text, useVideoTexture } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL, fetchFile } from "@ffmpeg/util";

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

  // Only when invalidate frame
  useFrame(() => {
    // console.log("rendering video background");
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
  onFinish: (videoURL: string) => void;
};

const RenderScene = (props: VideoEditorProps) => {
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

  const { gl, camera, scene, size, invalidate } = useThree();

  const width = size.width;
  const height = size.height;

  const startRecording = async () => {
    await load();
    const frames: Blob[] = [];

    for (let i = 0; i < MAX_FRAMES; i++) {
      setFrame((frame) => frame + 1);
      gl.render(scene, camera);
      await sleep(WAIT_MS);
      const renderingContext = gl.getContext();
      const frame = new Uint8Array(width * height * 4); // RGBA

      renderingContext.readPixels(
        0,
        0,
        width,
        height,
        renderingContext.RGBA,
        renderingContext.UNSIGNED_BYTE,
        frame
      );

      frames.push(new Blob([frame]));

      invalidate(); // only when you want to update the web gl frame counter
    }

    const inputVideoBlob = new Blob(frames);
    const ffmpeg = ffmpegRef.current;
    ffmpeg.writeFile("input.raw", await fetchFile(inputVideoBlob));

    await ffmpeg.exec([
      "-f",
      "rawvideo",
      "-pix_fmt",
      "rgba",
      "-s",
      `${width}x${height}`,
      "-r",
      `${FPS}`,
      "-i",
      "input.raw",
      "-c:v",
      "libx264",
      "-pix_fmt",
      "yuv420p",
      "output.mp4",
    ]);

    // TODO Error handling
    const fileData = await ffmpeg.readFile("output.mp4");
    const data = new Uint8Array(fileData as ArrayBuffer);
    const videoBlob = new Blob([data.buffer], { type: "video/mp4" });
    const videoUrl = URL.createObjectURL(videoBlob);

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
    <Canvas
      frameloop="demand"
      style={{ width: 180, height: 320 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <RenderScene {...props} />
    </Canvas>
  );
};
