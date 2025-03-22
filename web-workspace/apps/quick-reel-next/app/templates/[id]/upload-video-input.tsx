"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { projectStore } from "@/store/project.store";
import { useUploadVideo } from "@/lib/use-upload-video";
import { useSelector } from "@xstate/store/react";

export const UploadVideoInput = () => {
  const [file, setFile] = useState<File | null>(null);
  const uploadVideo = useUploadVideo(file);

  return (
    <section className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Input
          id="picture"
          type="file"
          onChange={(e) => {
            const selectedFile = e.target.files?.[0] || null;
            setFile(selectedFile);
          }}
        />
        <Button disabled={!file} onClick={() => uploadVideo.mutate()}>
          Upload
        </Button>
      </div>

      <ProgressBar />
    </section>
  );
};

const ProgressBar = () => {
  const progressPercentage = useSelector(
    projectStore,
    (state) => state.context.progressPercentage
  );

  const progressMessage = useSelector(
    projectStore,
    (state) => state.context.progressMessage
  );

  if (progressPercentage === 0) return null;

  return (
    <div>
      <Progress value={progressPercentage} max={100} />
      <span>{progressMessage}</span>
    </div>
  );
};
