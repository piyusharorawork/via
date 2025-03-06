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
  | EmptySegmentContent;

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
  videoTexture: THREE.VideoTexture;
};

type EmptySegmentContent = {
  Type: "empty";
};

type Region = {
  X: number;
  Y: number;
  Width: number;
  Height: number;
};
