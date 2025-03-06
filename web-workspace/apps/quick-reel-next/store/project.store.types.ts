import * as THREE from "three";

export type Layer = {
  Segments: Segment[];
};

export type Segment = {
  Start: number;
  End: number;
  Content: SegmentContent;
  PreviewUrl: string;
};

export type SegmentContent =
  | ImageSegmentContent
  | VideoSegmentContent
  | EmptySegmentContent
  | DissolveSegmentContent;

type ImageSegmentContent = {
  Type: "image";
  Url: string;
  Region: Region;
  texture: THREE.Texture;
};

type VideoSegmentContent = {
  Type: "video";
  Url: string;
  Region: Region;
  texture: THREE.Texture;
};

type EmptySegmentContent = {
  Type: "empty";
};

export type DissolveSegmentContent = {
  Type: "dissolve";
  prevTexture: THREE.Texture;
  nextTexture: THREE.Texture;
  progress: number;
};

type Region = {
  X: number;
  Y: number;
  Width: number;
  Height: number;
};
