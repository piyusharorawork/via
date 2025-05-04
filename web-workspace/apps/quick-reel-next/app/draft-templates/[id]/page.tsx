import { Separator } from "@/components/ui/separator";
import { TemplateHeader } from "./template-header";
import { VideoPreview } from "./video-preview";

export default function SingleTemplatePage() {
  return (
    <div className="h-screen flex flex-col">
      <section className="h-[5vh] flex flex-col">
        <TemplateHeader />
        <Separator />
      </section>

      <section className="h-[45vh] ">
        <VideoPreview />
      </section>
      <section className="h-[45vh] "></section>
      <section className="h-[5vh]"></section>
    </div>
  );
}
