import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/card.component.tsx";
import { Link } from "react-router-dom";

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
      className="w-full h-full gap-4 md:p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-6"
    >
      {props.templates.map((template) => {
        return (
          <Card key={template.id} className="my-4 justify-self-center h-auto">
            <CardHeader>
              <CardTitle>{template.name}</CardTitle>
            </CardHeader>

            <CardContent className="relative cursor-pointer">
              <Link to={`/editor?templateId=${template.id}`}>
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
    </section>
  );
};