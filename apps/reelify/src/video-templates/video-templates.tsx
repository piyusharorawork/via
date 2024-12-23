import { Button } from "../components/button.component.tsx";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/card.component.tsx";

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
      className="w-full h-full  grid grid-cols-1 items-center md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
    >
      {props.templates.map((template) => {
        return (
          <Card
            key={template.id}
            className="w-80 my-4 mx-8 justify-self-center"
          >
            <CardHeader>
              <CardTitle>{template.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <video
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
            <CardFooter>
              <Button className="w-full bg-purple-900">
                <span className="text-white">Use</span>
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </section>
  );
};
