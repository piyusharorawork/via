"use client";

import { Canvas } from "@react-three/fiber";
import { VideoTextureFrame } from "./video-texture-frame";

type Props = {
  fps: number;
};

export const EditorPreview = (props: Props) => {
  return (
    <section id="editor-preview" className="grow flex justify-center ">
      <main className="aspect-[9/16] w-[300px] ">
        <Canvas frameloop="demand">
          <ambientLight />
          <VideoTextureFrame
            fps={props.fps}
            videoUrl="https://res.cloudinary.com/dmtxtgvsb/video/upload/v1736600178/hotel-highlight-reel-original.mp4"
          />
        </Canvas>
      </main>
    </section>
  );
};
