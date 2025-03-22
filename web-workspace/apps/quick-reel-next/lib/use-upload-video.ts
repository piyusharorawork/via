import { projectStore } from "@/store/project.store";
import { useMutation } from "@tanstack/react-query";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";

export const useUploadVideo = (file: File | null) => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async () => await uploadVideo(file, router),
    onSuccess: (data) => {
      console.log(data);
    },
  });

  return mutation;
};

const uploadVideo = async (file: File | null, router: AppRouterInstance) => {
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);
  try {
    const response = await fetch("http://localhost:8080/make-reel", {
      method: "POST",
      body: formData,
    });
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    if (!reader) return;
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      const msgReceived = decoder.decode(value);
      if (msgReceived.includes("https://")) {
        projectStore.send({
          type: "setEditorUrl",
          editorUrl: msgReceived,
        });
        router.push("/templates/8/editor");
      } else {
        const [msg, progress] = msgReceived.split(",");
        projectStore.send({
          type: "setProgress",
          progressPercentage: parseInt(progress),
          progressMessage: msg,
        });
      }
    }
    if (!response.ok) {
      throw new Error("Upload failed");
    }
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};
