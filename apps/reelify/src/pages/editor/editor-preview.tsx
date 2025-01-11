import { MockPhone } from "./mock-phone.tsx";
import { useVideoUrl } from "./use-video-url.ts";

export const EditorPreview = () => {
  const videoUrl = useVideoUrl();

  return (
    <section
      id="editor-preview"
      className="w-full grow flex justify-center p-4 "
    >
      <div className="aspect-[9/16] h-full">
        <MockPhone>
          <video
            key={videoUrl}
            className="rounded-xl h-full"
            crossOrigin="anonymous"
            loop
            controls
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        </MockPhone>
      </div>
    </section>
  );
};
