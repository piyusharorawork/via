import { useStore } from "../../store.ts";
import { VideoTemplates } from "./video-templates.tsx";

export default function HomePage() {
  const videoTemplates = useStore((state) => state.videoTemplates);

  return <VideoTemplates templates={videoTemplates} />;
}
