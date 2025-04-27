"use client";
import React from "react";
import { useStoreInit } from "@/lib/use-store.init";
import { createTemplateBuilderStore } from "./template-builder.store";

type Props = {
  children: React.ReactNode;
};

const Context = React.createContext<ReturnType<
  typeof createTemplateBuilderStore
> | null>(null);

export const TemplateBuilderProvider: React.FC<Props> = (props) => {
  const { isReady, store } = useStoreInit(createTemplateBuilderStore);

  if (!isReady) {
    return null;
  }

  return <Context.Provider value={store}>{props.children}</Context.Provider>;
};

export const useTemplateBuilderStore = () => {
  const store = React.useContext(Context);
  if (!store) {
    throw new Error(
      "useTemplateBuilderStore must be used within a TemplateBuilderProvider"
    );
  }
  return store;
};
