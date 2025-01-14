import { useStore } from "@/store/store";
import { useParams } from "react-router-dom";

export const useVideoUrl = () => {
  const { id } = useParams();

  const videoTemplate = useStore((state) => state.videoTemplate);
  const selectedTemplate = videoTemplate(Number(id));

  if (!selectedTemplate) return;

  return selectedTemplate.videoURL.combined;
};
