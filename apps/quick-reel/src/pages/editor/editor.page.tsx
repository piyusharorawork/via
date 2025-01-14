import { useState } from "react";
import { useTemplateFrameCount } from "./use-template-frame-count";
import { CardTimeline } from "./card-timeline";

import { EditorPreview } from "./editor-preview";
import { PlayButton } from "./play-button";

export default function EditorPage() {
  const frameCount = useTemplateFrameCount();
  const [frameNumber, setFrameNumber] = useState(1);

  return (
    <div className="h-full flex flex-col px-4 py-2 gap-4">
      <EditorPreview frameNumber={frameNumber} fps={30} />

      <PlayButton onIncrement={() => console.log("inc")} />

      <CardTimeline
        frameCount={frameCount}
        frameNumber={frameNumber}
        onFrameChange={setFrameNumber}
        onTransitionSelect={(transition) => setFrameNumber(transition.start)}
      />
    </div>
  );
}
