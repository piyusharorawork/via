import { VideoEditor } from "@via/ui/video-editor";

export default function Playground() {
  return (
    <section className="flex flex-col h-screen items-center">
      <header>Playground</header>
      <div className="mobile bg-black my-4 rounded-xl">
        <VideoEditor />
      </div>
    </section>
  );
}
