import { TemplateHeader } from "./template-header";
import { VideoPreview } from "./video-preview";

export default function SingleTemplatePage() {
  return (
    <div className="h-screen flex flex-col">
      <section className="h-[10vh] ">
        <TemplateHeader />
      </section>
      <section className="h-[45vh] ">
        <VideoPreview />
      </section>
      <section className="h-[45vh] bg-gray-700"></section>
    </div>
  );
}
