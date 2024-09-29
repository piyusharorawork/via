import React, { useState } from "react";
import { GenerateVideoForm } from "@via/ui/generate-video-form";
import { useActor } from "@xstate/react";
import { VideoPreviewModal } from "@via/ui/video-preview-modal";
import { getGenerateReelMachine } from "@via/machine/generate-reel-machine";
import { ExportVideoModal } from "@via/ui/export-video-modal";

const generateReelMachine = getGenerateReelMachine(fetch);

export default function Home() {
  const [state, send] = useActor(generateReelMachine);
  const [quote, setQuote] = useState("");

  const matchAny = (values: (typeof state.value)[]) => {
    for (const value of values) {
      if (state.matches(value)) return true;
    }
    return false;
  };

  //console.log(state.value);
  // console.log(state.context.generateReelOutput);

  return (
    <section className="flex justify-center mt-4">
      {matchAny(["IDLE", "GENERATING_REEL"]) && (
        <GenerateVideoForm
          isGenerating={state.matches("GENERATING_REEL")}
          onGenerate={(prompt, quote) => {
            setQuote(quote);
            send({ type: "GENERATE_REEL", input: { prompt, quote } });
          }}
        />
      )}

      {state.matches("VIDEO_PREVIEW_OPENED") &&
        state.context.generateReelOutput && (
          <VideoPreviewModal
            height={state.context.generateReelOutput.height}
            width={state.context.generateReelOutput.width}
            videoURL={state.context.generateReelOutput.videoURL}
            fps={state.context.fpsInt}
            frames={state.context.generateReelOutput.frames}
            quote={quote}
            onExport={() => send({ type: "EXPORT_REEL" })}
            onClose={() => send({ type: "CANCEL_EXPORT" })}
          />
        )}

      {state.matches("EXPORT_REEL_MODAL_OPENED") &&
        state.context.generateReelOutput && (
          <ExportVideoModal
            fps={state.context.fpsInt}
            frames={state.context.generateReelOutput.frames}
            height={state.context.generateReelOutput.height}
            width={state.context.generateReelOutput.width}
            quote={quote}
            videoURL={state.context.generateReelOutput.videoURL}
            onCancel={() => send({ type: "CANCEL_EXPORT" })}
          />
        )}
    </section>
  );
}
