import { createStore } from "@xstate/store";

export type Template = {
  id: string;
  name: string;
  videoUrl: string;
};

type Context = {
  templates: Template[];
  inputTemplateName: string;
  inputWebsiteUrl: string;
  createTemplateDialogOpened: boolean;
};

export const createDraftTemplatesStore = () => {
  const context: Context = {
    templates: [],
    inputTemplateName: "",
    inputWebsiteUrl: "",
    createTemplateDialogOpened: false,
  };

  const store = createStore({
    context,
    on: {
      fetchTemplatesSuccess: ({}, event: { templates: Template[] }) => {
        return { templates: event.templates };
      },
      changeInputTemplateName: ({}, event: { templateName: string }) => {
        return { inputTemplateName: event.templateName };
      },
      changeInputWebsiteUrl: ({}, event: { websiteUrl: string }) => {
        return { inputWebsiteUrl: event.websiteUrl };
      },
      changeTemplateDialogOpened: ({}, event: { open: boolean }) => {
        return { createTemplateDialogOpened: event.open };
      },
    },
  });
  return store;
};
