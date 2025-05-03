import { createStore } from "@xstate/store";

export type Template = {
  id: string;
  name: string;
  videoUrl: string;
};

export enum TemplateBuilderState {
  IDLE,
  REMOVE_TEMPLATE_DIALOG_OPENED,
}

type Context = {
  templates: Template[];
  template: Template | null;
  state: TemplateBuilderState;
};

export const createTemplateBuilderStore = () => {
  const context: Context = {
    templates: [],
    template: null,
    state: TemplateBuilderState.IDLE,
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
        return { state: TemplateBuilderState.REMOVE_TEMPLATE_DIALOG_OPENED };
      },
      clickCancelRemoveTemplate: ({}) => {
        return { state: TemplateBuilderState.IDLE };
      },
      removeTemplateSuccess: ({}) => {
        return { state: TemplateBuilderState.IDLE };
      },
    },
  });
  return store;
};
