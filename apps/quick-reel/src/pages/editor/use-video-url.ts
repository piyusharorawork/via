import { useStore } from "../../store/store.ts";

export const useVideoUrl = () => {
  const selectedTemplate = useStore((state) => state.selectedTemplate);
  if (!selectedTemplate) return;

  return selectedTemplate.videoURL.combined;
};
