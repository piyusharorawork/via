import { useSearchParams } from "react-router-dom";
import { EditorPreview } from "./editor-preview";
import { useEffect } from "react";
import { useStore } from "../../store/store.ts";

export default function EditorPage() {
  const [searchParams] = useSearchParams();
  const templateId = searchParams.get("templateId");

  const setSelectedTemplate = useStore((state) => state.setSelectedTemplate);

  useEffect(() => {
    setSelectedTemplate(Number(templateId));
  }, []);

  return (
    <>
      <section id="editor-page" className="h-full flex flex-col">
        <EditorPreview />
      </section>
    </>
  );
}
