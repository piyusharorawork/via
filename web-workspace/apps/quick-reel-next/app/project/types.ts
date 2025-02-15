export type TransitionInfoContent = {
  Row: number;
  Column: number;
  Kind: string;
  MediaUrl: string;
};

export type TransitionInfoGrid = {
  Rows: number;
  Columns: number;
} | null;

export type TransitionInfo = {
  Type: string;
  Grid: TransitionInfoGrid;
  Content: TransitionInfoContent[] | null;
};

export type Transition = {
  StartFrame: number;
  EndFrame: number;
  Info: TransitionInfo;
};
