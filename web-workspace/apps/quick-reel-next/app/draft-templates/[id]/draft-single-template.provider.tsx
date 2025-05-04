"use client";
import React from "react";
import { createDraftSingleTemplateStore } from "./draft-single-template.store";
import { useStoreInit } from "@/lib/use-store.init";

type Props = {
  children: React.ReactNode;
};

const Context = React.createContext<ReturnType<
  typeof createDraftSingleTemplateStore
> | null>(null);

export const DraftSingleTemplateProvider = ({ children }: Props) => {
  const { isReady, store } = useStoreInit(createDraftSingleTemplateStore);

  if (!isReady) {
    return null;
  }

  return <Context.Provider value={store}>{children}</Context.Provider>;
};

export const useDraftSingleTemplateStore = () => {
  const store = React.useContext(Context);
  if (!store) {
    throw new Error(
      "useDraftSingleTemplateStore must be used within a DraftSingleTemplateProvider"
    );
  }
  return store;
};
