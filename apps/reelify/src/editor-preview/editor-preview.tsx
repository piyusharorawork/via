import { MockPhone } from "./mock-phone.tsx";
import { useStore } from "../store.ts";

export const EditorPreview = () => {
  const selectedTemplate = useStore((state) => state.selectedTemplate);

  return (
    <section
      id="editor-preview"
      className="w-full grow flex justify-center p-4 "
    >
      <div className="aspect-[9/16] h-full ">
        <MockPhone>
          {selectedTemplate && (
            <video
              className="w-full h-full rounded-xl"
              crossOrigin="anonymous"
              muted
              loop
              autoPlay
            >
              <source src={selectedTemplate.videoUrl} type="video/mp4" />
            </video>
          )}
        </MockPhone>
      </div>
    </section>
  );
};
