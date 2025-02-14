import { templates } from "./data/templates";
import { VideoTemplates } from "./video-templates";
import { Sample } from "./sample";

export default function TemplatesPage() {
  return (
    <>
      <VideoTemplates templates={templates} />;
      <Sample />
    </>
  );
}
