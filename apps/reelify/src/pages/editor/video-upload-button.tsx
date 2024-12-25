import { Button } from "../../components/button.component.tsx";
import { UploadIcon } from "../../icons.tsx";
import { useStore } from "../../store.ts";
import { MyUploadButton } from "../../upload-thing.tsx";
import { twMerge } from "tailwind-merge";

export const VideoUploadButton = () => {
  const setUploadedFileUrl = useStore((state) => state.setUploadedFileUrl);
  const setVideoUploadStatus = useStore((state) => state.setVideoUploadStatus);
  const setVideoUploadProgress = useStore(
    (state) => state.setVideoUploadProgress
  );
  const videoUploadStatus = useStore((state) => state.videoUploadStatus);
  const videoUploadProgress = useStore((state) => state.videoUploadProgress);

  return (
    <div className="h-32 flex flex-col justify-center items-center">
      <MyUploadButton
        className="upload-button absolute w-32 cursor-pointer"
        endpoint="mediaUploader"
        onClientUploadComplete={(files: any) => {
          const videoUrl = files[0].url;
          setUploadedFileUrl(videoUrl);
          setVideoUploadStatus("uploaded");
        }}
        onUploadError={(error: any) => {
          console.error("Upload error:", error);
        }}
        onUploadProgress={(percentage: any) => {
          setVideoUploadProgress(percentage);
        }}
        onUploadBegin={() => {
          setVideoUploadStatus("uploading");
        }}
        config={{ cn: twMerge }}
      />
      <Button
        variant="outline"
        className="flex items-center gap-2 cursor-pointer w-40"
        disabled={videoUploadStatus === "uploading"}
      >
        <UploadIcon className="w-5 h-5" />
        Upload Video
        {videoUploadStatus === "uploading" && (
          <p className="text-sm mt-2">{videoUploadProgress}%</p>
        )}
      </Button>
    </div>
  );
};
