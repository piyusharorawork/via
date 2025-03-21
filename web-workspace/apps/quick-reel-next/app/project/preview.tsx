"use client";

import { projectStore } from "@/store/project.store";
import { Canvas } from "@react-three/fiber";
import { useSelector } from "@xstate/store/react";
import { useEffect } from "react";
import { DissolveEffect } from "./dissolve-effect";
import { MediaContent } from "./segment-content";

export const FRAME_HEIGHT = 7.7;
export const FRAME_WIDTH = 4.3;

export const Preview = () => {
  useEffect(() => {
    const win = window as any;
    win.store = projectStore;
    setLayers();
  }, []);

  const setLayers = async () => {
    const res = await fetch("http://localhost:8080/layers");
    const layers = await res.json();
    projectStore.send({ type: "setLayers", layers });
  };

  return (
    <Canvas
      gl={{ preserveDrawingBuffer: true }}
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#000",
      }}
    >
      <ambientLight />
      <VideoMesh />
    </Canvas>
  );
};

const VideoMesh = () => {
  const segments = useSelector(
    projectStore,
    (state) => state.context.currentSegments
  );

  if (segments.length === 0) {
    return (
      <mesh>
        <planeGeometry args={[FRAME_WIDTH, FRAME_HEIGHT]} />
        <meshBasicMaterial color={"black"} />
      </mesh>
    );
  }

  return segments.map((segment, index) => {
    switch (segment.Content.Type) {
      case "empty":
        return <mesh key={index}></mesh>;

      case "image":
      case "video":
        return (
          <MediaContent
            key={index}
            content={segment.Content}
            frameWidth={FRAME_WIDTH}
            frameHeight={FRAME_HEIGHT}
          />
        );

      case "dissolve":
        return <DissolveEffect key={index} content={segment.Content} />;
    }
  });
};
