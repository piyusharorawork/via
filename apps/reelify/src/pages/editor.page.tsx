import { useSearchParams } from "react-router-dom";
import { EditorPreview } from "../editor-preview/editor-preview.tsx";
import { Timeline } from "../editor-preview/timeline.tsx";
import { Navbar } from "../navbar/navbar.component.tsx";
import { useEffect } from "react";
import { useStore } from "../store.ts";

export default function EditorPage() {
  const [searchParams] = useSearchParams();
  const templateId = searchParams.get("templateId");

  const setSelectedTemplate = useStore((state) => state.setSelectedTemplate);

  useEffect(() => {
    setSelectedTemplate(Number(templateId));
  }, []);

  return (
    <section id="editor-page" className="h-screen  w-full py-2 flex flex-col">
      <Navbar />
      <EditorPreview />
      <Timeline />
    </section>
  );
}
