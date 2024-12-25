import { create } from "zustand";

type VideoTemplate = {
  id: number;
  name: string;
  videoUrl: string;
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
      id: 1,
      name: "Food",
      videoUrl:
        "https://utfs.io/f/aDJlEJjuVaFgCWdCWa5T0xEBHIfCMchA6Yk3ty1XJsRZa7nQ",
    },
    {
      id: 2,
      name: "Beach",
      videoUrl:
        "https://utfs.io/f/aDJlEJjuVaFg3ZxQgwViNjRm1G7TAhsxa9eHMtWOcJIgrypD",
    },
    {
      id: 3,
      name: "Famliy",
      videoUrl:
        "https://utfs.io/f/aDJlEJjuVaFg2gnk8MeSIZgcv5qlHAL49KsXudbG68eWtOQ3",
    },
    {
      id: 4,
      name: "Mountain",
      videoUrl:
        "https://utfs.io/f/aDJlEJjuVaFgUHWNDvLHKJFBuz38RdYy6PwMITVvACW7qDsh",
    },
    {
      id: 5,
      name: "House",
      videoUrl:
        "https://utfs.io/f/aDJlEJjuVaFgHS4cyR9oXzh2PLQK4uigABFO7rkq8cwa5Wyl",
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
