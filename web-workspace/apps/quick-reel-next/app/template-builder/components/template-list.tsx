"use client";

import { useSelector } from "@xstate/store/react";
import { useTemplateBuilderStore } from "../store/template-builder.provider";
import { useTemplates } from "../hooks/use-templates";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export const TemplateList = () => {
  const store = useTemplateBuilderStore();
  const templates = useSelector(store, (state) => state.context.templates);
  const { isLoading } = useTemplates();

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="mx-4 my-8 grid gap-6 grid-cols-1 md:grid-cols-3 lg:grid-cols-6 ">
      {templates.map((template) => {
        return (
          <Card key={template.id} className="my-4 justify-self-center">
            <CardHeader>
              <CardTitle>{template.name}</CardTitle>
            </CardHeader>

            <CardContent className="relative cursor-pointer">
              <Link href={`/template-builder/${template.id}`}>
                <video
                  className="rounded-lg"
                  crossOrigin="anonymous"
                  playsInline
                  muted
                  loop
                  onMouseEnter={(e) => {
                    const video = e.target as HTMLVideoElement;
                    video.play();
                  }}
                  onMouseLeave={(e) => {
                    const video = e.target as HTMLVideoElement;
                    video.pause();
                  }}
                >
                  <source src={template.videoUrl} type="video/mp4" />
                </video>
              </Link>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

const LoadingSpinner = () => {
  return (
    <div className="h-full w-full absolute flex justify-center items-center">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
    </div>
  );
};
