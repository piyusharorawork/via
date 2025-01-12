import { useStore } from "../../store.ts";

export const useVideoUrl = () => {
  const selectedTemplate = useStore((state) => state.selectedTemplate);
  const uploadedFileUrl = useStore((state) => state.uploadedFileUrl);

  if (uploadedFileUrl) return uploadedFileUrl;

  if (!selectedTemplate) return;

  return selectedTemplate.videoURL.combined;
};
