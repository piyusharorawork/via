"use client";

import { Canvas } from "@react-three/fiber";
import { VideoTextureFrame } from "./video-texture-frame";
import { EditorPreviewVideo } from "./editor-preview-video";

type Props = {
  fps: number;
  videoUrl: string;
};

export const EditorPreview = (props: Props) => {
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
