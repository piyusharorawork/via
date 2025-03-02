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

// Reference https://chatgpt.com/c/67c2f9cb-2f70-8006-a77c-13c0ae081766
const getCenter = (rows: number, index: number): number => {
  if (rows % 2 === 1) {
    const distance = FRAME_HEIGHT / rows;
    return (Math.floor(rows / 2) - index) * distance;
  }

  const distance = (2 * FRAME_HEIGHT) / rows;
  const half = rows / 2;
  return index < half
    ? (half - index) * -distance
    : (index - half + 1) * distance;
};

const VideoMesh = () => {
  const transition = useSelector(
    projectStore,
    (state) => state.context.transition
  );

  if (!transition) return null;

  const contentList = transition.Info.Content;

  if (contentList.length === 0 || !transition.Info.Grid) {
    return (
      <mesh>
        <planeGeometry args={[FRAME_WIDTH, FRAME_HEIGHT]} />
        <meshBasicMaterial color={"black"} />
      </mesh>
    );
  }

  const rows = transition.Info.Grid.Rows;
  const columns = transition.Info.Grid.Columns;
  const margin = transition.Info.Grid.Margin;
  const height = FRAME_HEIGHT / rows - margin;
  const width = FRAME_WIDTH / columns;

  return transition.Info.Content.map((content, index) => {
    const center = getCenter(rows, index);

    if (content.Kind === "empty") {
      return (
        <mesh key={index} position={[0, center, 0]}>
          <planeGeometry args={[width, height]} />
          <meshBasicMaterial color={"black"} />
        </mesh>
      );
    }

    return (
      <mesh key={index} position={[0, center, 0]}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial map={content.texture} />
      </mesh>
    );
  });
};
