import { createStore } from "@xstate/store";

type PreviewFrame = {
  frameNo: number;
  previewUrl: string;
};

export type DraftTemplateFull = {
  id: string;
  name: string;
  videoUrl: string;
  websiteUrl: string;
  clipInfo: ClipInfo;
  previewFrames: PreviewFrame[];
};

type ClipInfo = {
  fps: number;
  frameCount: number;
};

type Context = {
  template: DraftTemplateFull | null;
  timeStamps: number[];
  openRemoveTemplateDialog: boolean;
};

export const createDraftSingleTemplateStore = () => {
  const context: Context = {
    template: null,
    timeStamps: [],
    openRemoveTemplateDialog: false,
  };

  const store = createStore({
    context,
    on: {
      fetchSingleTemplateSuccess: (
        {},
        event: { template: DraftTemplateFull }
      ) => {
        const timeStamps = createTimeStamps(
          event.template.clipInfo.fps,
          event.template.clipInfo.frameCount
        );
        return { template: event.template, timeStamps };
      },
      changeOpenRemoveTemplateDialog: ({}, event: { open: boolean }) => {
        return { openRemoveTemplateDialog: event.open };
      },
      removeTemplateSuccess: ({}) => {
        return {
          timeStamps: [],
          template: null,
        };
      },
    },
  });

  return store;
};

const createTimeStamps = (fps: number, frameCount: number): number[] => {
  const seconds = Math.ceil(frameCount / fps);
  return Array.from({ length: seconds }, (_, i) => i);
};
