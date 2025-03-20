import { TemplatePreview } from "./template-preview";
import { UploadVideoInput } from "./upload-video-input";

export default function TemplatesPage() {
  return (
    <section id="editor-page" className="h-full flex flex-col ">
      <TemplatePreview />
      <div className="h-32 flex justify-center items-center ">
        <UploadVideoInput />
      </div>
    </section>
  );
}
