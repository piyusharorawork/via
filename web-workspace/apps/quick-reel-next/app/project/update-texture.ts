import { Region } from "@/store/project.store.types";
import * as THREE from "three";

export const updateTexture = (
  texture: THREE.Texture,
  region: Region,
  frameWidth: number,
  frameHeight: number
) => {
  // TODO
  const textureAspect = 0.5625;
  const planeWidth = frameWidth * region.Width;
  const planeHeight = frameHeight * region.Height;
  const planeAspect = planeWidth / planeHeight;

  if (Math.abs(planeAspect - textureAspect) < 0.2) return;

  texture.needsUpdate = true;
  texture.repeat.set(1, textureAspect / planeAspect);

  const xOffset = 0;
  const yOffset = 0.5;
  texture.offset.set(xOffset, yOffset);
};
