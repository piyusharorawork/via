// import { useStore } from "@/store/store";
import { Frame } from "./frame";
import { useState } from "react";
import { useTemplateFrameCount } from "./use-template-frame-count";
import { CardTimeline } from "./card-timeline";

export default function EditorPage() {
  const frameCount = useTemplateFrameCount();
  const [frameNumber, setFrameNumber] = useState(1);

  return (
    <div className="h-full flex flex-col px-4 py-2 gap-4">
      <section id="editor-preview" className="grow flex justify-center">
        <div className="aspect-[9/16] max-w-sm">
          <Frame frameNumber={frameNumber} />
        </div>
      </section>

      <CardTimeline
        frameCount={frameCount}
        frameNumber={frameNumber}
        onFrameChange={setFrameNumber}
      />
    </div>
  );
}
