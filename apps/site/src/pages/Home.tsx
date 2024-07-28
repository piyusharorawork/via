import React from "react";
import { GenerateVideoForm } from "@via/ui/generate-video-form";
import { getVideoManagementMachine } from "@via/machine/video-management-machine";
import { useActor } from "@xstate/react";
import { VideoRenderModal } from "@via/ui/video-render-modal";

const videoManagementMachine = getVideoManagementMachine(fetch);

export default function Home() {
  const [state, send] = useActor(videoManagementMachine);

  console.log(state.value);
  console.log(state.context.errorMessage);

  return (
    <section className="flex justify-center mt-4">
      <GenerateVideoForm
        isGenerating={state.matches("MAKING_VIDEO")}
        onGenerate={(prompt, quote) =>
          send({ type: "GENERATE_VIDEO", input: { prompt, quote } })
        }
      />

      <VideoRenderModal
        onClose={() => send({ type: "CLOSE_RENDER_MODAL" })}
        open={state.matches("RENDER_VIDEO_MODAL")}
        videoURL={state.context.makeVideoOutput?.videoURL}
      />
    </section>
  );
}
