import { createStore } from "@xstate/store";

type Template = {
  name: string;
};

type Context = {
  templates: Template[];
};

export const createTemplateBuildStore = () => {
  const context: Context = {
    templates: [],
  };

  const store = createStore({
    context,
    on: {},
  });
  return store;
};
