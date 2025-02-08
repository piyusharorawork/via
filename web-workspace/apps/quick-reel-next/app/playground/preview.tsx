"use client";
import { Canvas } from "@react-three/fiber";

export const Preview = () => {
  return (
    <Canvas className="bg-slate-200">
      <ambientLight intensity={Math.PI / 2} />
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="blue" />
      </mesh>
    </Canvas>
  );
};
