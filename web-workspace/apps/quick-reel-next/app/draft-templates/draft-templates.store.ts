import { createStore } from "@xstate/store";

export type Template = {
  id: string;
  name: string;
  videoUrl: string;
};

type Context = {
  templates: Template[];
};

export const createDraftTemplatesStore = () => {
  const context: Context = {
    templates: [],
  };

  const store = createStore({
    context,
    on: {
      fetchTemplatesSuccess: ({}, event: { templates: Template[] }) => {
        return { templates: event.templates };
      },
    },
  });
  return store;
};
