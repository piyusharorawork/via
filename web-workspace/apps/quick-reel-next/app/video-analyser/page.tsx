import { VideoForm } from "./video-form";
import { FramePreview } from "./frame-preview";
import { FrameController } from "./frame-controller";

export default function VideoAnalyserPage() {
  return (
    <div className="h-screen flex flex-col">
      <section className="flex-grow relative">
        <FramePreview />
      </section>

      <section>
        <FrameController />
      </section>

      <section className="h-72 shrink-0">
        <VideoForm />
      </section>
    </div>
  );
}
