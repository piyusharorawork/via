import { templates } from "../data/templates";
import { MockPhone } from "./mock-phone";

export const TemplatePreview = () => {
  const videoUrl = templates[0].videoURL.combined;

  return (
    <section
      id="template-preview"
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
