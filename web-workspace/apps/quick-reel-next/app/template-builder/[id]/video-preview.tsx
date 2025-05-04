"use client";

import { useSelector } from "@xstate/store/react";
import { useTemplateBuilderStore } from "../store/template-builder.provider";
import { useTemplate } from "../hooks/use-template";

export const VideoPreview = () => {
  const store = useTemplateBuilderStore();
  const videoURL = useSelector(
    store,
    (state) => state.context.template?.videoUrl
  );
  useTemplate();

  if (!videoURL) return null;

  console.log(videoURL);

  return (
    <div className="h-full flex justify-center py-2">
      <video crossOrigin="anonymous" className="h-full wf" preload="auto">
        <source src={videoURL} type="video/mp4" />
      </video>
    </div>
  );
};
