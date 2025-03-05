import * as THREE from "three";

export type Layer = {
  Segments: Segment[];
};

export type Segment = {
  Start: number;
  End: number;
  Content: SegmentContent;
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

// export type Transition = {
//   StartFrame: number;
//   EndFrame: number;
//   Type: "layout" | "dissolve" | null;
//   Grid: TransitionGrid | null;
//   Content: TransitionContent | null;
//   PreviewUrl: string | null;
// };

// export type TransitionContent = {
//   Row: number;
//   Column: number;
//   Kind: "video" | "image" | "empty";
//   MediaUrl: string;
//   texture?: THREE.Texture;
// };

// type TransitionGrid = {
//   Rows: number;
//   Columns: number;
//   Margin: number;
// };
