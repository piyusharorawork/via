import { EditorPreview } from "../editor-preview/editor-preview.tsx";
import { Timeline } from "../editor-preview/timeline.tsx";
import { Navbar } from "../navbar/navbar.component.tsx";

export default function EditorPage() {
  return (
    <section id="edito-page" className="h-screen  w-full py-2 flex flex-col">
      <Navbar />
      <EditorPreview />
      <Timeline />
    </section>
  );
}
