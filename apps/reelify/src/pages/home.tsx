import { Navbar } from "../navbar/navbar.component.tsx";
import { VideoTemplates } from "../video-templates/video-templates.tsx";

const videoTemplates = [
  {
    id: 1,
    name: "Template 1",
    videoUrl:
      "https://utfs.io/f/aDJlEJjuVaFg55Ah1LKlWDRFUVKPpTdEgy8k9BxrYCMNOs6v",
  },
  {
    id: 2,
    name: "Template 2",

    videoUrl:
      "https://utfs.io/f/aDJlEJjuVaFg55Ah1LKlWDRFUVKPpTdEgy8k9BxrYCMNOs6v",
  },
  {
    id: 3,
    name: "Template 3",

    videoUrl:
      "https://utfs.io/f/aDJlEJjuVaFg55Ah1LKlWDRFUVKPpTdEgy8k9BxrYCMNOs6v",
  },
  {
    id: 4,
    name: "Template 4",

    videoUrl:
      "https://utfs.io/f/aDJlEJjuVaFg55Ah1LKlWDRFUVKPpTdEgy8k9BxrYCMNOs6v",
  },
  {
    id: 5,
    name: "Template 5",

    videoUrl:
      "https://utfs.io/f/aDJlEJjuVaFg55Ah1LKlWDRFUVKPpTdEgy8k9BxrYCMNOs6v",
  },
];

export default function Home() {
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
