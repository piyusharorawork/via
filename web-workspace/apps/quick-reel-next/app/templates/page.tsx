import { templates } from "./data/templates";
import { VideoTemplates } from "./video-templates";

export default function TemplatesPage() {
  return (
    <>
      <VideoTemplates templates={templates} />;
    </>
  );
}
