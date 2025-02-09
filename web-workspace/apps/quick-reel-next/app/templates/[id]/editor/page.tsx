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
    <main className="h-full flex flex-col">
      <section
        id="editor-preview"
        className="flex-grow flex justify-center items-center min-h-0"
      >
        <EditorPreview
          fps={30}
          videoUrl="https://res.cloudinary.com/dmtxtgvsb/video/upload/v1738046574/hotel-highlight-reel-hotel-highlight-reel-540p_kgksts.mp4"
        />
      </section>
      <section id="player-controller" className="h-12">
        <PlayButton fps={30} />
      </section>
      <section id="timeline" className="h-40">
        <CardTimeline
          fps={30}
          frameCount={frameCount}
          transitionFrames={transitionFrames}
          transitions={transitions}
        />
      </section>
    </main>
  );
}
