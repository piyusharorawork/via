import { useStore } from "@/store/store";
import { VideoTemplates } from "./video-templates";

export default function HomePage() {
  const videoTemplates = useStore((state) => state.videoTemplates);

  return <VideoTemplates templates={videoTemplates} />;
}
