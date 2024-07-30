import { Canvas } from "@react-three/fiber";
import { Text, useVideoTexture } from "@react-three/drei";

const VideoBackground = () => {
  const videoTexture: any = useVideoTexture(
    "http://localhost:4000/uploads/1722237708740.mp4"
  );

  return (
    <mesh>
      <planeGeometry attach="geometry" args={[4, 7.4]} />
      <meshBasicMaterial attach="material" map={videoTexture} />
    </mesh>
  );
};

export const VideoEditor = () => {
  return (
    <Canvas>
      <Text
        position={[0, 3, 0]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Hello
      </Text>
      <VideoBackground />
    </Canvas>
  );
};
