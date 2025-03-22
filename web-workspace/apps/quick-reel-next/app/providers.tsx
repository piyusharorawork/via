"use client";

import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { projectStore } from "@/store/project.store";

type Props = {
  children: React.ReactNode;
};

export default function Providers(props: Props) {
  const [queryClient] = React.useState(() => new QueryClient());
  const win = window as any;
  win.store = projectStore;

  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  );
}
