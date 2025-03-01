"use client";
import { templates } from "../../data/templates";
import { EditorPreview } from "./editor-preview";
import { PlayButton } from "./play-button";
import { CardTimeline } from "./card-timeline";
import { transitionFrames } from "../../data/transition-frames";
import { transitions } from "../../data/transitions";

export default function EditorPage() {
  const frameCount = templates[0].videoInfo.frameCount;
  const fps = templates[0].videoInfo.fps;
  const audioUrl = templates[0].videoInfo.audioUrl;
  // const editorUrl = templates[0].videoInfo.editorUrl;
  const editorUrl =
    "https://test-v1.blr1.digitaloceanspaces.com/temp/rishikesh-output.mp4";

  return (
    <main className="h-full flex flex-col">
      <section
        id="editor-preview"
        className="flex-grow flex justify-center items-center min-h-0"
      >
        <EditorPreview fps={fps} videoUrl={editorUrl} />
      </section>
      <section id="player-controller" className="h-12">
        <PlayButton fps={fps} audioUrl={audioUrl} />
      </section>
      <section id="timeline" className="h-40">
        <CardTimeline
          fps={fps}
          frameCount={frameCount}
          transitionFrames={transitionFrames}
          transitions={transitions}
        />
      </section>
    </main>
  );
}
