import { useStore } from "@/store/store";
import { useParams } from "react-router-dom";

export const useTemplateFrameCount = () => {
  const { id } = useParams();
  const template = useStore((state) => state.videoTemplate(Number(id)));

  if (!template) return 0;

  return template.videoInfo.frameCount;
};
