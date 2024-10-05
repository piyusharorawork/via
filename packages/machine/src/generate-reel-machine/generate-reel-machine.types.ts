import { GenerateReelOutput } from "@via/core/video-manager";

export type GenerateReelContext = {
  errorMessage: string | null;
  generateReelOutput: GenerateReelOutput | null;
  progress: number;
  exportedVideoURL: string;
  videoDescription: string;
  quote: string;
};

export type GenerateReelFormEvent =
  | { type: "UPDATE_VIDEO_DESCRIPTION"; videoDescription: string }
  | { type: "UPDATE_QUOTE"; quote: string }
  | { type: "GENERATE_REEL" };
