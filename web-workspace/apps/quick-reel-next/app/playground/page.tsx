import { VideoPreview } from "./video-preview";

export default function PlaygroundPage() {
  return (
    <section className="h-screen w-full flex flex-col">
      <h1 className="text-center">Playground</h1>
      <VideoPreview />
    </section>
  );
}
