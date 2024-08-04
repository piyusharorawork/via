import React, { useState } from "react";
import { GenerateVideoForm } from "@via/ui/generate-video-form";
import { getVideoManagementMachine } from "@via/machine/video-management-machine";
import { useActor } from "@xstate/react";
import { VideoRenderModal } from "@via/ui/video-render-modal";

const videoManagementMachine = getVideoManagementMachine(fetch);

export default function Home() {
  const [state, send] = useActor(videoManagementMachine);
  const [quote, setQuote] = useState("");

  console.log(state.value);
  // console.log(state.context.generateReelOutput);

  return (
    <section className="flex justify-center mt-4">
      <GenerateVideoForm
        isGenerating={state.matches("GENERATING_REEL")}
        onGenerate={(prompt, quote) => {
          setQuote(quote);
          send({ type: "GENERATE_REEL", input: { prompt, quote } });
        }}
      />

      {state.context.generateReelOutput && (
        <VideoRenderModal
          text={quote}
          open={
            state.matches("RENDER_VIDEO_MODAL") ||
            state.matches("EXPORT_MODAL_OPENED")
          }
          openExportModal={state.matches("EXPORT_MODAL_OPENED")}
          height={state.context.generateReelOutput.height}
          width={state.context.generateReelOutput.width}
          videoURL={state.context.generateReelOutput.videoURL}
          fps={state.context.generateReelOutput.fps}
          frames={state.context.generateReelOutput.frames}
          onExport={() => send({ type: "EXPORT_VIDEO" })}
          onClose={() => send({ type: "CLOSE_RENDER_MODAL" })}
          onExportCancel={() => send({ type: "CANCEL_EXPORT" })}
        />
      )}
    </section>
  );
}
