"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { projectStore } from "@/store/project.store";

export const UploadVideoInput = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  useEffect(() => {
    const win = window as any;
    win.store = projectStore;
  }, []);

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
                if (msgReceived.includes("https://")) {
                  projectStore.send({
                    type: "setEditorUrl",
                    editorUrl: msgReceived,
                  });
                  router.push("/templates/8/editor");
                } else {
                  const [msg, progress] = msgReceived.split(",");
                  setMessages(() => [msg]);
                  setProgress(() => parseInt(progress));
                }
              }
              if (!response.ok) {
                throw new Error("Upload failed");
              }
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
