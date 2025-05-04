import { createStore } from "@xstate/store";

export type DraftTemplateFull = {
  id: string;
  name: string;
  videoUrl: string;
  websiteUrl: string;
};

export enum DraftSingleTemplateState {
  IDLE,
  REMOVE_TEMPLATE_DIALOG_OPENED,
}

type Context = {
  template: DraftTemplateFull | null;
  state: DraftSingleTemplateState;
};

export const createDraftSingleTemplateStore = () => {
  const context: Context = {
    template: null,
    state: DraftSingleTemplateState.IDLE,
  };

  const store = createStore({
    context,
    on: {
      fetchSingleTemplateSuccess: (
        {},
        event: { template: DraftTemplateFull }
      ) => {
        return { template: event.template };
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
        return { state: DraftSingleTemplateState.IDLE };
      },
    },
  });

  return store;
};
