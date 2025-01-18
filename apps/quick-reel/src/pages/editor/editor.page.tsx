import { useState } from "react";
import { useTemplateFrameCount } from "./hooks/use-template-frame-count";
import { CardTimeline } from "./components/card-timeline";

import { EditorPreview } from "./components/editor-preview";
import { PlayButton } from "./components/play-button";

export default function EditorPage() {
  const frameCount = useTemplateFrameCount();
  const [frameNumber, setFrameNumber] = useState(1);

  return (
    <div className="h-full flex flex-col px-4 py-2 gap-4">
      <EditorPreview frameNumber={frameNumber} fps={30} />

      <PlayButton
        onIncrement={() =>
          setFrameNumber((frameNumber) => (frameNumber + 1) % (frameCount + 1))
        }
        fps={30}
      />

      <CardTimeline
        frameCount={frameCount}
        frameNumber={frameNumber}
        onFrameChange={setFrameNumber}
        onTransitionSelect={(transition) => setFrameNumber(transition.start)}
      />
    </div>
  );
}
