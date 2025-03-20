"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const UploadVideoInput = () => {
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  return (
    <div className="flex gap-2">
      <Input
        id="picture"
        type="file"
        onChange={(e) => {
          const selectedFile = e.target.files?.[0] || null;
          setFile(selectedFile);
        }}
      />
      <Button
        disabled={!file}
        onClick={async () => {
          if (!file) return;

          const formData = new FormData();
          formData.append("file", file);

          try {
            const response = await fetch("http://localhost:8080/make-reel", {
              method: "POST",
              body: formData,
            });

            if (!response.ok) {
              throw new Error("Upload failed");
            }

            router.push("/templates/8/editor");
          } catch (error) {
            console.error("Error uploading file:", error);
          }
        }}
      >
        Upload
      </Button>
    </div>
  );
};
