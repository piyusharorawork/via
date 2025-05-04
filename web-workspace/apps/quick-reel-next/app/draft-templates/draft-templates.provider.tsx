"use client";
import React from "react";
import { useStoreInit } from "@/lib/use-store.init";
import { createDraftTemplatesStore } from "./draft-templates.store";

type Props = {
  children: React.ReactNode;
};

const Context = React.createContext<ReturnType<
  typeof createDraftTemplatesStore
> | null>(null);

export const DraftTemplatesProvider: React.FC<Props> = (props) => {
  const { isReady, store } = useStoreInit(createDraftTemplatesStore);

  if (!isReady) {
    return null;
  }

  return <Context.Provider value={store}>{props.children}</Context.Provider>;
};

export const useDraftTemplatesStore = () => {
  const store = React.useContext(Context);
  if (!store) {
    throw new Error(
      "useDraftTemplatesStore must be used within a DraftTemplatesProvider"
    );
  }
  return store;
};
