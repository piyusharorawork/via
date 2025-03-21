"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";

export const UploadVideoInput = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

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

              const reader = response.body?.getReader();
              const decoder = new TextDecoder();

              if (!reader) return;

              while (true) {
                const { value, done } = await reader.read();
                if (done) break;
                const msgReceived = decoder.decode(value);
                const [msg, progress] = msgReceived.split(",");

                setMessages(() => [msg]);
                setProgress(() => parseInt(progress));
              }

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

      <div>
        <Progress value={progress} max={100} />
        <span>{messages}</span>
      </div>
    </section>
  );
};
