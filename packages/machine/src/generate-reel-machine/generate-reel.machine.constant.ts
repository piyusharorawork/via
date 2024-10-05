import { GenerateReelContext } from "./generate-reel-machine.types.js";

export const defaultGenerateReelContext: GenerateReelContext = {
  videoDescription: "",
  quote: "",
  errorMessage: null, // any error message when something went wrong
  generateReelOutput: null,
  progress: 0,
  exportedVideoURL: "",
};
