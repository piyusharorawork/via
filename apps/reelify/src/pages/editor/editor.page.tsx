import { useSearchParams } from "react-router-dom";
import { EditorPreview } from "./editor-preview.tsx";
import { useEffect } from "react";
import { useStore } from "../../store.ts";
import { VideoUploadButton } from "./video-upload-button.tsx";
import { Timeline } from "./timeline.tsx";

export default function EditorPage() {
  const [searchParams] = useSearchParams();
  const templateId = searchParams.get("templateId");

  const setSelectedTemplate = useStore((state) => state.setSelectedTemplate);
  const videoUploadStatus = useStore((state) => state.videoUploadStatus);

  useEffect(() => {
    setSelectedTemplate(Number(templateId));
  }, []);

  return (
    <>
      <section id="editor-page" className="h-full flex flex-col">
        <EditorPreview />
        {(videoUploadStatus === "not-uploaded" ||
          videoUploadStatus === "uploading") && <VideoUploadButton />}
        {videoUploadStatus === "uploaded" && <Timeline />}
      </section>
    </>
  );
}
