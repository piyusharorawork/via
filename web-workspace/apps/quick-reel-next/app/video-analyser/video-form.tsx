"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSelector } from "@xstate/store/react";
import { useVideoAnalyserStore } from "../providers/video-analyser.provider";

export const VideoForm = () => {
  const store = useVideoAnalyserStore();

  return (
    <div className="flex flex-col px-8 h-full py-4">
      <h2 className="text-center text-xl">Enter Video Info</h2>
      <section className="flex flex-col gap-4 grow ">
        <UrlField />
        <ClipInfoField />
        <Button
          onClick={() =>
            store.send({
              type: "saveVideoInfo",
            })
          }
        >
          Save
        </Button>
      </section>
    </div>
  );
};

const UrlField = () => {
  const store = useVideoAnalyserStore();
  const videoUrl = useSelector(store, (state) => state.context.videoUrl);

  return (
    <div className="flex flex-col gap-2">
      <Label>Video Url</Label>
      <Input
        type="url"
        placeholder="Enter video url to analyze"
        value={videoUrl}
        onChange={(e) => {
          store.send({
            type: "setVideoUrl",
            videoUrl: e.target.value,
          });
        }}
      />
    </div>
  );
};

const ClipInfoField = () => {
  const store = useVideoAnalyserStore();
  const clipInfoStr = useSelector(store, (state) => state.context.clipInfoStr);

  return (
    <div className="grow flex flex-col gap-2">
      <Label>ClipInfo</Label>
      <Textarea
        className="grow"
        placeholder="Paste Clip Info"
        onChange={(e) =>
          store.send({
            type: "setClipInfo",
            clipInfo: e.target.value,
          })
        }
        value={clipInfoStr}
      />
    </div>
  );
};
