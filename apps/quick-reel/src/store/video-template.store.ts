export type VideoTemplate = {
  id: number;
  name: string;
  videoURL: {
    high: string;
    low: string;
    combined: string;
  };
  videoInfo: {
    fps: number;
    frameCount: number;
    frameSize: {
      width: number;
      height: number;
    };
  };
  transitions: Transition[];
};

type TransitionInfo =
  | {
      type: "cut";
    }
  | {
      type: "fade-out-instant";
    };

type Transition = {
  start: number;
  end: number;
  info: TransitionInfo;
};
