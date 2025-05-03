"use client";

import { useSelector } from "@xstate/store/react";
import { useTemplateBuilderStore } from "../store/template-builder.provider";
import { useTemplates } from "../hooks/use-templates";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Loader2, Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const TemplateList = () => {
  const store = useTemplateBuilderStore();
  const templates = useSelector(store, (state) => state.context.templates);
  const { isLoading, isError } = useTemplates();

  if (isLoading) return <LoadingSpinner />;

  if (isError) return <SomethingWentWrong />;

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

const SomethingWentWrong = () => {
  return (
    <Alert>
      <Terminal className="h-4 w-4" />
      <AlertTitle>Oops!</AlertTitle>
      <AlertDescription>
        Something went wrong. Please try again later :(
      </AlertDescription>
    </Alert>
  );
};
