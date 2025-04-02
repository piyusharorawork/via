import { VideoForm } from "./video-form";
import { FramePreview } from "./frame-preview";

export default function TransitionAnalyserPage() {
  return (
    <div className="h-screen flex flex-col">
      <section className="flex-grow relative">
        <FramePreview />
      </section>

      <section className="h-72 shrink-0">
        <VideoForm />
      </section>
    </div>
  );
}
