"use client";
import { templates } from "../../data/templates";
import { EditorPreview } from "./editor-preview";
import { PlayButton } from "./play-button";
import { CardTimeline } from "./card-timeline";
import { transitionFrames } from "../../data/transition-frames";
import { transitions } from "../../data/transitions";

export default function EditorPage() {
  const frameCount = templates[0].videoInfo.frameCount;

  return (
    <div className="h-full flex flex-col px-4 py-2 gap-4">
      <EditorPreview fps={30} />
      <PlayButton fps={30} />
      <CardTimeline
        frameCount={frameCount}
        transitionFrames={transitionFrames}
        transitions={transitions}
      />
    </div>
  );
}
