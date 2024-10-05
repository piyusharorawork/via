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
          onGenerate={() => send({ type: "Form:GenerateReel" })}
          enableGenerate={state.can({ type: "Form:GenerateReel" })}
          onPromptChange={(prompt) =>
            send({
              type: "Form:UpdateVideoDescription",
              videoDescription: prompt,
            })
          }
          onQuoteChange={(quote) => send({ type: "Form:UpdateQuote", quote })}
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
            onExport={() => send({ type: "VideoEditor:Export" })}
            onClose={() => send({ type: "VideoEditor:Close" })}
          />
        )}

      {state.matches("ExportReelView") && state.context.generateReelOutput && (
        <ExportVideoModal
          fps={state.context.generateReelOutput.fps}
          frames={state.context.generateReelOutput.frames}
          height={state.context.generateReelOutput.height}
          width={state.context.generateReelOutput.width}
          quote={state.context.quote}
          videoURL={state.context.generateReelOutput.videoURL}
          progress={state.context.progress}
          onCancel={() => send({ type: "ExportReel:Cancel" })}
        />
      )}

      {state.matches("ExportReelView") && state.context.generateReelOutput && (
        <VideoRenderer
          fps={state.context.generateReelOutput.fps}
          frames={state.context.generateReelOutput.frames}
          height={state.context.generateReelOutput.height}
          width={state.context.generateReelOutput.width}
          quote={state.context.quote}
          videoURL={state.context.generateReelOutput.videoURL}
          onFinish={(videoURL) =>
            send({ type: "ExportReel:Finished", videoURL })
          }
          onProgress={(amount) => {
            send({ type: "ExportReel:UpdateProgress", amount });
          }}
        />
      )}

      {state.matches("VideoDownloadView") &&
        state.context.exportedVideoURL.length > 0 && (
          <VideoPreviewModal
            exportedVideoURL={state.context.exportedVideoURL}
            onClose={() => send({ type: "VideoPreview:Close" })}
          />
        )}
    </section>
  );
}
