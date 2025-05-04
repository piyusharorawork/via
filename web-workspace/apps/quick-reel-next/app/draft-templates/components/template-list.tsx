"use client";

import { useSelector } from "@xstate/store/react";
import { useDraftTemplatesStore } from "../draft-templates.provider";
import { useFetchTemplates } from "../use-fetch-templates";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Loader2, Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const TemplateList = () => {
  const store = useDraftTemplatesStore();
  const templates = useSelector(store, (state) => state.context.templates);
  const { isLoading, isError } = useFetchTemplates();

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <SomethingWentWrong />;

  return (
    <div className="mx-4 my-8 grid gap-6 grid-cols-1  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 ">
      {templates.map((template) => {
        return (
          <Link href={`/draft-templates/${template.id}`} key={template.id}>
            <Card className="my-4 justify-self-center">
              <CardHeader>
                <CardTitle>{template.name}</CardTitle>
              </CardHeader>

              <CardContent className="relative cursor-pointer">
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
              </CardContent>
            </Card>
          </Link>
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
