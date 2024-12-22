import { Navbar } from "../navbar/navbar.component.tsx";
import { VideoTemplates } from "../video-templates/video-templates.tsx";

const videoTemplates = [
  {
    id: 1,
    name: "Template 1",
    thumbnail:
      "https://images.pexels.com/videos/3198221/free-video-3198221.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    videoUrl:
      "https://videos.pexels.com/video-files/3198221/3198221-hd_1080_1920_25fps.mp4",
  },
];

export default function Home() {
  return (
    <section id="home-page">
      <header>
        <Navbar />
      </header>
      <main>
        <VideoTemplates templates={videoTemplates} />
      </main>
      <footer></footer>
    </section>
  );
}
