import { Button } from "@/components/ui/button.tsx";
import { TemplatePreview } from "./template-preview.tsx";
import { VideoIcon } from "@/components/features/icons.tsx";
import { Link, useParams } from "react-router-dom";

export default function TemplatePage() {
  const { id } = useParams();

  return (
    <>
      <section id="editor-page" className="h-full flex flex-col ">
        <TemplatePreview />
        <div className="h-32 flex justify-center items-center ">
          <Link to={`/template/${id}/editor`}>
            <Button className="w-32 flex gap-4">
              <VideoIcon />
              <span>Edit Video</span>
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
