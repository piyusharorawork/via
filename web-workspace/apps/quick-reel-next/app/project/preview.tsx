"use client";

import { projectStore } from "@/store/project.store";
import { useVideoTexture } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useSelector } from "@xstate/store/react";
import { useEffect } from "react";
import * as THREE from "three";

const FRAME_HEIGHT = 7.7;
const FRAME_WIDTH = 4.3;

export const Preview = () => {
  useEffect(() => {
    const win = window as any;
    win.store = projectStore;
  }, []);

  return (
    <Canvas
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
        // return (
        //   <mesh key={index}>
        //     <planeGeometry args={[FRAME_WIDTH, FRAME_HEIGHT]} />
        //     <meshBasicMaterial color={"black"} />
        //   </mesh>
        // );
        return <mesh key={index}></mesh>;

      case "image":
        return (
          <mesh
            key={index}
            position={[
              (FRAME_WIDTH / 2) * segment.Content.Region.X,
              (FRAME_HEIGHT / 2) * segment.Content.Region.Y,
              0,
            ]}
          >
            <planeGeometry
              args={[
                FRAME_WIDTH * segment.Content.Region.Width,
                FRAME_HEIGHT * segment.Content.Region.Height,
              ]}
            />
            <meshBasicMaterial map={segment.Content.texture} />
          </mesh>
        );

      case "video":
        return (
          <mesh
            key={index}
            position={[
              (FRAME_WIDTH / 2) * segment.Content.Region.X,
              (FRAME_HEIGHT / 2) * segment.Content.Region.Y,
              0,
            ]}
          >
            <planeGeometry
              args={[
                FRAME_WIDTH * segment.Content.Region.Width,
                FRAME_HEIGHT * segment.Content.Region.Height,
              ]}
            />
            <meshBasicMaterial map={segment.Content.videoTexture} />
          </mesh>
        );
    }
  });
};
