import React, { useState } from "react";
import { GenerateVideoForm } from "@via/ui/generate-video-form";
import { useActor } from "@xstate/react";
import { VideoEditorModal } from "@via/ui/video-editor-modal";
import { getGenerateReelMachine } from "@via/machine/generate-reel-machine";
import { ExportVideoModal } from "@via/ui/export-video-modal";
import { VideoRenderer } from "@via/ui/video-renderer";
import { VideoPreview } from "@via/ui/video-preview";
import { VideoPreviewModal } from "@via/ui/video-preview-modal";

const generateReelMachine = getGenerateReelMachine(fetch);

export default function Home() {
  const [state, send] = useActor(generateReelMachine);

  const matchAny = (values: (typeof state.value)[]) => {
    for (const value of values) {
      if (state.matches(value)) return true;
    }
    return false;
  };

  // console.log(state.value);
  // console.log(state.context);
  // console.log(state.context.generateReelOutput);

  return (
    <section className="flex justify-center mt-4">
      {state.matches("GenerateFormView") && (
        <GenerateVideoForm
          videoDescription={state.context.videoDescription}
          quote={state.context.quote}
          isGenerating={state.matches({ GenerateFormView: "generatingReel" })}
          onGenerate={() => send({ type: "CLICK_GENERATE_REEL" })}
          enableGenerate={state.can({ type: "CLICK_GENERATE_REEL" })}
          onPromptChange={(prompt) =>
            send({ type: "UPDATE_VIDEO_DESCRIPTION", videoDescription: prompt })
          }
          onQuoteChange={(quote) => send({ type: "UPDATE_QUOTE", quote })}
        />
      )}

      {state.matches("VideoEditingView") &&
        state.context.generateReelOutput && (
          <VideoEditorModal
            height={state.context.generateReelOutput.height}
            width={state.context.generateReelOutput.width}
            videoURL={state.context.generateReelOutput.videoURL}
            fps={state.context.generateReelOutput.fps}
            frames={state.context.generateReelOutput.frames}
            quote={state.context.quote}
            onExport={() => send({ type: "EXPORT_REEL" })}
            onClose={() => send({ type: "CLOSE_VIDEO_EDITOR_MODAL" })}
          />
        )}

      {/* 

      {state.matches("EXPORTING_REEL") && state.context.generateReelOutput && (
        <ExportVideoModal
          fps={state.context.fpsInt}
          frames={state.context.generateReelOutput.frames}
          height={state.context.generateReelOutput.height}
          width={state.context.generateReelOutput.width}
          quote={quote}
          videoURL={state.context.generateReelOutput.videoURL}
          progress={state.context.progress}
          onCancel={() => send({ type: "CANCEL_EXPORT" })}
        />
      )}

      {state.matches("EXPORTING_REEL") && state.context.generateReelOutput && (
        <VideoRenderer
          fps={state.context.fpsInt}
          frames={state.context.generateReelOutput.frames}
          height={state.context.generateReelOutput.height}
          width={state.context.generateReelOutput.width}
          quote={quote}
          videoURL={state.context.generateReelOutput.videoURL}
          onFinish={(videoURL) => send({ type: "EXPORT_FINISH", videoURL })}
          onProgress={(amount) => {
            send({ type: "UPDATE_PROGRESS", amount });
          }}
        />
      )}

      {state.matches("VIDEO_PREVIEW_MODAL_OPENED") &&
        state.context.exportedVideoURL.length > 0 && (
          <VideoPreviewModal
            exportedVideoURL={state.context.exportedVideoURL}
            onClose={() => send({ type: "CLOSE_VIDEO_PREVIEW_MODAL" })}
          />
        )} */}
    </section>
  );
}
