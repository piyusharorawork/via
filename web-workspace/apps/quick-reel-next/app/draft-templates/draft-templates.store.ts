import { IStorage } from "@/lib/storage";
import { createStore } from "@xstate/store";

export type Template = {
  id: string;
  name: string;
  videoUrl: string;
};

export enum DraftTemplatesState {
  IDLE,
  REMOVE_TEMPLATE_DIALOG_OPENED,
}

type Context = {
  templates: Template[];
  template: Template | null;
  state: DraftTemplatesState;
};

export const createDraftTemplatesStore = (storage: IStorage) => {
  const context: Context = {
    templates: [],
    template: null,
    state: DraftTemplatesState.IDLE,
  };

  const store = createStore({
    context,
    on: {
      fetchTemplatesSuccess: ({}, event: { templates: Template[] }) => {
        return { templates: event.templates };
      },
      fetchSingleTemplateSuccess: ({}, event: { template: Template }) => {
        return { template: event.template };
      },
      clickRemoveTemplate: ({}) => {
        return { state: DraftTemplatesState.REMOVE_TEMPLATE_DIALOG_OPENED };
      },
      clickCancelRemoveTemplate: ({}) => {
        return { state: DraftTemplatesState.IDLE };
      },
      removeTemplateSuccess: ({}) => {
        return { state: DraftTemplatesState.IDLE };
      },
    },
  });
  return store;
};
