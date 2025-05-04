import { Separator } from "@/components/ui/separator";
import { TemplateHeader } from "./template-header";
import { VideoPreview } from "./video-preview";
import { Timeline } from "./timeline";

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
      <section className="h-[50vh]">
        <Timeline />
      </section>
    </div>
  );
}
