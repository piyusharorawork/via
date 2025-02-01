"use client";

import { Canvas } from "@react-three/fiber";
import { VideoTextureFrame } from "./video-texture-frame";
import { useEffect, useRef } from "react";
import { store } from "@/store/store";

type Props = {
  fps: number;
  videoUrl: string;
};

export const EditorPreview = (props: Props) => {
  return (
    <section id="editor-preview" className="grow flex justify-center ">
      <main className="aspect-[9/16] w-[300px] ">
        {/* <EditorPreviewCanvas {...props} /> */}
        <EditorPreviewVideo {...props} />
      </main>
    </section>
  );
};

const EditorPreviewCanvas = (props: Props) => {
  return (
    <Canvas frameloop="demand">
      <ambientLight />
      <VideoTextureFrame fps={props.fps} videoUrl={props.videoUrl} />
    </Canvas>
  );
};

const EditorPreviewVideo = (props: Props) => {
  console.log("editor preview video");

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let seeking = true;

    const handleSeeking = () => {
      seeking = true;
    };

    const handleSeeked = () => {
      seeking = false;
    };

    video.addEventListener("seeking", handleSeeking);
    video.addEventListener("seeked", handleSeeked);

    video.currentTime = 0;

    store.subscribe((state) => {
      // console.log({ seeking, frame: state.context.frame });
      if (seeking) return;
      video.currentTime = state.context.frame / props.fps;
    });

    return () => {
      video.removeEventListener("seeking", handleSeeking);
      video.removeEventListener("seeked", handleSeeked);
    };
  }, [props.videoUrl, videoRef.current]);

  return (
    <>
      <video ref={videoRef} muted playsInline>
        <source src={props.videoUrl} type="video/mp4" />
      </video>
    </>
  );
};
