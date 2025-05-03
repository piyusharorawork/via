import { createStore } from "@xstate/store";

export type Template = {
  id: string;
  name: string;
  videoUrl: string;
};

type Context = {
  templates: Template[];
  template: Template | null;
};

export const createTemplateBuilderStore = () => {
  const context: Context = {
    templates: [],
    template: null,
  };

  const store = createStore({
    context,
    on: {
      setTemplates: ({}, event: { templates: Template[] }) => {
        return { templates: event.templates };
      },
      setTemplate: ({}, event: { template: Template }) => {
        return { template: event.template };
      },
    },
  });
  return store;
};
