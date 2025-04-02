"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { videoAnalyserStore } from "@/store/video-analyser.store";
import { useEffect, useState } from "react";

export const VideoForm = () => {
  const [videoUrl, setUrl] = useState("");
  const [clipInfo, setClipInfo] = useState("");

  useEffect(() => {
    videoAnalyserStore.send({ type: "load" });
  }, []);

  return (
    <div className="flex flex-col px-8 h-full py-4">
      <h2 className="text-center text-xl">Enter Video Info</h2>
      <section className="flex flex-col gap-4 grow ">
        <UrlField url={videoUrl} onChangeUrl={setUrl} />
        <ClipInfoField clipInfo={clipInfo} onChangeClipInfo={setClipInfo} />
        <Button
          onClick={() =>
            videoAnalyserStore.send({
              type: "submitVideoInfo",
              clipInfo,
              videoUrl,
            })
          }
        >
          Submit
        </Button>
      </section>
    </div>
  );
};

const UrlField = (props: {
  url: string;
  onChangeUrl: (url: string) => void;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <Label>Video Url</Label>
      <Input
        type="url"
        placeholder="Enter video url to analyze"
        value={props.url}
        onChange={(e) => props.onChangeUrl(e.target.value)}
      />
    </div>
  );
};

const ClipInfoField = (props: {
  clipInfo: string;
  onChangeClipInfo: (clipInfo: string) => void;
}) => {
  return (
    <div className="grow flex flex-col gap-2">
      <Label>ClipInfo</Label>
      <Textarea
        className="grow"
        placeholder="Paste Clip Info"
        onChange={(e) => props.onChangeClipInfo(e.target.value)}
      />
    </div>
  );
};
