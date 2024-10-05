import { GenerateReelOutput } from "@via/core/video-manager";

export type GenerateReelContext = {
  errorMessage: string | null;
  generateReelOutput: GenerateReelOutput | null;
  progress: number;
  exportedVideoURL: string;
  videoDescription: string;
  quote: string;
  videoElements: VideoElement[];
  selectedElement: VideoElement | null;
};

export type VideoElement = { type: "text"; id: string; textInfo: TextInfo };

export type TextInfo = {
  text: string;
  position: [number, number];
};

export type GenerateReelFormEvent =
  | { type: "Form:UpdateVideoDescription"; videoDescription: string }
  | { type: "Form:UpdateQuote"; quote: string }
  | { type: "Form:GenerateReel" };

export type VideoEditorEvent =
  | { type: "VideoEditor:Close" }
  | { type: "VideoEditor:Export" }
  | { type: "VideoEditor:SelectElement"; element: VideoElement }
  | { type: "VideoEditor:UpdateElement"; element: VideoElement }
  | { type: "VideoEditor:UnselectAll" };

export type ExportReelEvent =
  | { type: "ExportReel:UpdateProgress"; amount: number } // TODO this can be moved inside the machine as an internal event
  | { type: "ExportReel:Finished"; videoURL: string }
  | { type: "ExportReel:Cancel" };

export type VideoPreviewEvent = { type: "VideoPreview:Close" };

export type GenerateReelActorResponses = {
  generateReelResponse:
    | {
        success: true;
        data: GenerateReelOutput;
      }
    | { success: false; data: null };
};
