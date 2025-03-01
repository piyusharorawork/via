import * as THREE from "three";

export type Transition = {
  StartFrame: number;
  EndFrame: number;

  Info: TransitionInfo;
};

type TransitionInfo = {
  Type: "layout" | "dissolve";
  Grid: TransitionGrid | null;
  Content: TransitionContent[];
};

type TransitionContent = {
  Row: number;
  Column: number;
  Kind: "video" | "image";
  MediaUrl: string;
  texture?: THREE.Texture;
};

type TransitionGrid = {
  Rows: number;
  Columns: number;
};
