"use client";
import { useState } from "react";
import { templates } from "../../data/templates";
import { EditorPreview } from "./editor-preview";
import { PlayButton } from "./play-button";
import { CardTimeline } from "./card-timeline";
import { transitionFrames } from "../../data/transition-frames";
import { transitions } from "../../data/transitions";

export default function EditorPage() {
  const frameCount = templates[0].videoInfo.frameCount;
  const [frameNumber, setFrameNumber] = useState(1);

  return (
    <div className="h-full flex flex-col px-4 py-2 gap-4">
      <EditorPreview frameNumber={frameNumber} fps={30} />

      <PlayButton
        onIncrement={() => setFrameNumber((frameNumber) => frameNumber + 1)}
        fps={30}
      />

      <CardTimeline
        frameCount={frameCount}
        frameNumber={frameNumber}
        transitionFrames={transitionFrames}
        transitions={transitions}
        onFrameChange={setFrameNumber}
        onTransitionSelect={(transition) => setFrameNumber(transition.start)}
      />
    </div>
  );
}
