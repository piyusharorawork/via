import { createStore } from "@xstate/store";

export type Template = {
  id: string;
  name: string;
  videoUrl: string;
};

type Context = {
  templates: Template[];
};

export const createTemplateBuilderStore = () => {
  const context: Context = {
    templates: [],
  };

  const store = createStore({
    context,
    on: {
      setTemplates: ({}, event: { templates: Template[] }) => {
        return { templates: event.templates };
      },
    },
  });
  return store;
};
