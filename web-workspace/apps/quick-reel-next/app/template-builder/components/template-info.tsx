"use client";

import { useSelector } from "@xstate/store/react";
import { useTemplate } from "../hooks/use-template";
import { useTemplateBuilderStore } from "../store/template-builder.provider";

export const TemplateInfo = () => {
  const store = useTemplateBuilderStore();
  const template = useSelector(store, (state) => state.context.template);
  useTemplate();
  return <div>{JSON.stringify(template, null, 2)}</div>;
};
