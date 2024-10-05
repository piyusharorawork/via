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
  | { type: "Form:UpdateVideoDescription"; videoDescription: string }
  | { type: "Form:UpdateQuote"; quote: string }
  | { type: "Form:GenerateReel" };
