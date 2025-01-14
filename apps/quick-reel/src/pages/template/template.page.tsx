import { TemplatePreview } from "./template-preview.tsx";

export default function TemplatePage() {
  return (
    <>
      <section id="editor-page" className="h-full flex flex-col">
        <TemplatePreview />
      </section>
    </>
  );
}
