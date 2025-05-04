"use client";

import { useSelector } from "@xstate/store/react";
import { useDraftSingleTemplateStore } from "./draft-single-template.provider";
import { useFetchTemplate } from "./use-fetch-template";

export const VideoPreview = () => {
  const store = useDraftSingleTemplateStore();
  const videoURL = useSelector(
    store,
    (state) => state.context.template?.videoUrl
  );
  useFetchTemplate();

  if (!videoURL) return null;

  return (
    <div className="h-full flex justify-center py-4">
      <video
        crossOrigin="anonymous"
        className="h-full wf rounded-xl"
        preload="auto"
      >
        <source src={videoURL} type="video/mp4" />
      </video>
    </div>
  );
};
