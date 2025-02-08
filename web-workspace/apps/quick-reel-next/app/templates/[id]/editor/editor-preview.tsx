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
