"use client";

import { Canvas } from "@react-three/fiber";

export const Preview = () => {
  return (
    <Canvas
      style={{ width: "360px", height: "640px", border: "1px solid red" }}
    >
      <ambientLight />
      <VideoMesh />
    </Canvas>
  );
};

const VideoMesh = () => {
  return (
    <mesh>
      <planeGeometry args={[4.3, 7.7]} />
      <meshBasicMaterial />
    </mesh>
  );
};
