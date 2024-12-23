import { Button } from "../components/button.component.tsx";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/card.component.tsx";
import { VideoIcon } from "../icons.tsx";

type VideoTemplate = {
  id: number;
  name: string;
  videoUrl: string;
};

type Props = {
  templates: VideoTemplate[];
};

export const VideoTemplates = (props: Props) => {
  return (
    <section
      id="video-templates"
      className="w-full h-full  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-6 gap-4"
    >
      {props.templates.map((template) => {
        return (
          <Card
            key={template.id}
            className="w-80 my-4 justify-self-center h-auto"
          >
            <CardHeader>
              <CardTitle>{template.name}</CardTitle>
            </CardHeader>
            <CardContent className="relative">
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
                onClick={(e) => {
                  const video = e.target as HTMLVideoElement;
                  video.paused ? video.play() : video.pause();
                }}
              >
                <source src={template.videoUrl} type="video/mp4" />
              </video>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button className="">
                <VideoIcon />
                <span>Create Video</span>
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </section>
  );
};
