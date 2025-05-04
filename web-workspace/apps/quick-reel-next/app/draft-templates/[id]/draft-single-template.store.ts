import { createStore } from "@xstate/store";

export type DraftTemplateFull = {
  id: string;
  name: string;
  videoUrl: string;
  websiteUrl: string;
  clipInfo: ClipInfo;
};

type ClipInfo = {
  fps: number;
  frameCount: number;
};

export enum DraftSingleTemplateState {
  IDLE,
  REMOVE_TEMPLATE_DIALOG_OPENED,
}

type Context = {
  template: DraftTemplateFull | null;
  state: DraftSingleTemplateState;
  timeStamps: number[];
};

export const createDraftSingleTemplateStore = () => {
  const context: Context = {
    template: null,
    state: DraftSingleTemplateState.IDLE,
    timeStamps: [],
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
      clickRemoveTemplate: ({}) => {
        return {
          state: DraftSingleTemplateState.REMOVE_TEMPLATE_DIALOG_OPENED,
        };
      },
      clickCancelRemoveTemplate: ({}) => {
        return { state: DraftSingleTemplateState.IDLE };
      },
      removeTemplateSuccess: ({}) => {
        return {
          state: DraftSingleTemplateState.IDLE,
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
