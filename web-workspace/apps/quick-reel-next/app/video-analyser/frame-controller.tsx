"use client";
import { Slider } from "@/components/ui/slider";
import { useVideoAnalyserStore } from "../providers/video-analyser.provider";
import { useSelector } from "@xstate/store/react";
import { getClipInfo } from "./store";

export const FrameController = () => {
  const store = useVideoAnalyserStore();
  const clipInfoStr = useSelector(store, (state) => state.context.clipInfoStr);
  const frameNo = useSelector(store, (state) => state.context.frameNo);
  const clipInfo = getClipInfo(clipInfoStr);

  if (!clipInfo) return null;

  return (
    <div className="mt-4 px-2">
      <Slider
        className="bg-blue-400"
        onValueChange={(values) => {
          store.send({ type: "setFrameNo", frameNo: values[0] });
        }}
        min={1}
        max={clipInfo.frameCount}
      />
      <div className="flex justify-center text-xl mt-2">{frameNo}</div>
    </div>
  );
};
