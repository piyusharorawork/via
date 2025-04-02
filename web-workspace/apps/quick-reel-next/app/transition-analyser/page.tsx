import { VideoForm } from "./video-form";
import { FramePreview } from "./frame-preview";

export default function TransitionAnalyserPage() {
  return (
    <div className="h-screen flex flex-col">
      <section className="flex-grow relative">
        <FramePreview videoUrl="https://test-v1.blr1.digitaloceanspaces.com/temp/09756d15-866c-4d4e-911d-ace01b9f6a81/house.mp4" />
      </section>

      <section className="h-72 shrink-0">
        <VideoForm />
      </section>
    </div>
  );
}
