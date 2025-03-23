import * as THREE from "three";

export type Layer = {
  Segments: Segment[];
};

export type Segment = {
  Start: number;
  End: number;
  Content: SegmentContent;
  PreviewUrl: string; // TODO Need to remove
  PreviewUrls: string[];
};

export type SegmentContent =
  | ImageSegmentContent
  | VideoSegmentContent
  | EmptySegmentContent
  | DissolveSegmentContent;

export type ImageSegmentContent = {
  Type: "image";
  Url: string;
  Region: Region;
  texture: THREE.Texture;
};

export type VideoSegmentContent = {
  Type: "video";
  Url: string;
  Region: Region;
  texture: THREE.VideoTexture;
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

export type Region = {
  X: number;
  Y: number;
  Width: number;
  Height: number;
};
