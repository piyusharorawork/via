"use client";

import React from "react";
import { ReactQueryProvider } from "./react-query.provider";
import { VideoAnalyserProvider } from "./video-analyser.provider";

type Props = {
  children: React.ReactNode;
};

export default function Providers(props: Props) {
  return (
    <ReactQueryProvider>
      <VideoAnalyserProvider>{props.children}</VideoAnalyserProvider>
    </ReactQueryProvider>
  );
}
