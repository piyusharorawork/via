"use client";

import { Canvas } from "@react-three/fiber";
import { VideoTextureFrame } from "./video-texture-frame";
import { EditorPreviewVideo } from "./editor-preview-video";
import { useEffect } from "react";
import { projectStore } from "@/store/project.store";

type Props = {
  fps: number;
  videoUrl: string;
};

export const EditorPreview = (props: Props) => {
  useEffect(() => {
    setLayers();
  }, []);

  const setLayers = async () => {
    const res = await fetch("http://localhost:8080/layers");
    const layers = await res.json();
    projectStore.send({ type: "setLayers", layers });
  };

  return (
    <main className="w-full h-full flex justify-center py-2">
      <EditorPreviewVideo {...props} />
      {/* <EditorPreviewCanvas {...props} /> */}
    </main>
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
