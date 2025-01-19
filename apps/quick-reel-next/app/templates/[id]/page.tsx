import Link from "next/link";
import { TemplatePreview } from "./template-preview";
import { templates } from "../data/templates";
import { Button } from "@/components/ui/button";
import { VideoIcon } from "@/components/features/icons";

export default function TemplatesPage() {
  return (
    <section id="editor-page" className="h-full flex flex-col ">
      <TemplatePreview />
      <div className="h-32 flex justify-center items-center ">
        <Link href={`/template/${templates[0].id}/editor`}>
          <Button className="w-32 flex gap-4">
            <VideoIcon />
            <span>Edit Video</span>
          </Button>
        </Link>
      </div>
    </section>
  );
}
