import {
  GenerateReelActorResponses,
  GenerateReelContext,
} from "./generate-reel-machine.types.js";

export const defaultGenerateReelContext: GenerateReelContext = {
  videoDescription: "",
  quote: "",
  errorMessage: null, // any error message when something went wrong
  generateReelOutput: null,
  progress: 0,
  exportedVideoURL: "",
  videoElements: [
    {
      id: "1",
      type: "text",
      textInfo: {
        text: "some text",
        position: [0, 0, 0],
        color: "#ffffff",
        fontSize: 16,
      },
    },
  ],
  selectedElement: null,
};

export const defaultGenerateReelActorResponses: GenerateReelActorResponses = {
  generateReelResponse: {
    success: true,
    data: {
      videoId: 1,
      videoUUID: "123",
      videoURL: "https://www.youtube.com/watch?v=123",
      width: 100,
      height: 100,
      fps: 30,
      frames: 100,
    },
  },
};
