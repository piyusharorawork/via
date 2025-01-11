import { MockPhone } from "./mock-phone.tsx";
import { useStore } from "../../store.ts";

export const EditorPreview = () => {
  const selectedTemplate = useStore((state) => state.selectedTemplate);
  const uploadedFileUrl = useStore((state) => state.uploadedFileUrl);

  const getVideoUrl = () => {
    if (uploadedFileUrl) {
      return uploadedFileUrl;
    }

    return selectedTemplate?.video.high;
  };

  const videoUrl = getVideoUrl();

  return (
    <section
      id="editor-preview"
      className="w-full grow flex justify-center p-4 "
    >
      <div className="aspect-[9/16] h-full ">
        <MockPhone>
          {selectedTemplate && (
            <video
              key={videoUrl}
              className="rounded-xl h-full"
              crossOrigin="anonymous"
              muted
              loop
              autoPlay
            >
              <source src={videoUrl} type="video/mp4" />
            </video>
          )}
        </MockPhone>
      </div>
    </section>
  );
};
