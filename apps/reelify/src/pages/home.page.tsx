import { Navbar } from "../navbar/navbar.component.tsx";
import { useStore } from "../store.ts";
import { VideoTemplates } from "../video-templates/video-templates.tsx";

export default function HomePage() {
  const videoTemplates = useStore((state) => state.videoTemplates);

  return (
    <section id="home-page" className="h-screen flex flex-col">
      <header>
        <Navbar />
      </header>
      <main className="grow">
        <VideoTemplates templates={videoTemplates} />
      </main>
      <footer></footer>
    </section>
  );
}
