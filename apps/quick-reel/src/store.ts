import { create } from "zustand";

type VideoTemplate = {
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

type Transition = {
  start: number;
  end: number;
  info: TransitionInfo;
};

type TransitionInfo =
  | {
      type: "cut";
    }
  | {
      type: "fade-out-instant";
    };

type State = {
  videoTemplates: VideoTemplate[];
  selectedTemplate: VideoTemplate | null;
  uploadedFileUrl: string | null;
  videoUploadStatus: "not-uploaded" | "uploading" | "uploaded";
  videoUploadProgress: number;

  setSelectedTemplate: (id: number) => void;
  setUploadedFileUrl: (url: string) => void;
  setVideoUploadStatus: (
    status: "not-uploaded" | "uploading" | "uploaded"
  ) => void;
  setVideoUploadProgress: (progress: number) => void;
};

export const useStore = create<State>((set) => ({
  videoTemplates: [
    {
      id: 8,
      name: "Hotel Highlight Reel",
      videoURL: {
        high: "https://res.cloudinary.com/dmtxtgvsb/video/upload/v1736600178/hotel-highlight-reel-original.mp4",
        low: "https://res.cloudinary.com/dmtxtgvsb/video/upload/v1736599645/render-forest.mp4",
        combined:
          "https://res.cloudinary.com/dmtxtgvsb/video/upload/v1736603169/combined.mp4",
      },
      transitions: [],
      videoInfo: {
        fps: 30,
        frameCount: 422,
        frameSize: {
          height: 1920,
          width: 1080,
        },
      },
    },
  ],
  selectedTemplate: null,
  uploadedFileUrl: null,
  videoUploadStatus: "not-uploaded",
  videoUploadProgress: 0,
  setSelectedTemplate: (id: number) => {
    const template = useStore
      .getState()
      .videoTemplates.find((template) => template.id === id);
    set({ selectedTemplate: template });
  },
  setUploadedFileUrl: (url: string) => {
    set({ uploadedFileUrl: url });
  },
  setVideoUploadStatus: (status: "not-uploaded" | "uploading" | "uploaded") => {
    set({ videoUploadStatus: status });
  },
  setVideoUploadProgress: (progress: number) => {
    set({ videoUploadProgress: progress });
  },
}));
