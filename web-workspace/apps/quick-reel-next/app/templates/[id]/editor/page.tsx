"use client";
import { templates } from "../../data/templates";
import { EditorPreview } from "./editor-preview";
import { PlayButton } from "./play-button";
import { CardTimeline } from "./card-timeline";
import { useSelector } from "@xstate/store/react";
import { projectStore } from "@/store/project.store";
import { PrimaryLayer } from "./primary-layer";
// import { LayersTimeline } from "./layers-timeline";

export default function EditorPage() {
  const frameCount = templates[0].videoInfo.frameCount;
  const fps = templates[0].videoInfo.fps;
  const audioUrl = templates[0].videoInfo.audioUrl;

  const layers = useSelector(projectStore, (state) => state.context.layers);

  const editorUrl =
    "https://test-v1.blr1.digitaloceanspaces.com/temp/reel-output-output.mp4";

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
      {layers.length > 0 && (
        <section id="timeline" className="h-48">
          <CardTimeline
            fps={fps}
            frameCount={frameCount}
            segments={layers[0].Segments}
          />
          {/* <LayersTimeline layers={layers} /> */}
          {/* <PrimaryLayer segments={layers[0].Segments} /> */}
        </section>
      )}
    </main>
  );
}
