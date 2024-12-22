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
  thumbnail: string;
  videoUrl: string;
};

type Props = {
  templates: VideoTemplate[];
};

export const VideoTemplates = (props: Props) => {
  return (
    <section id="video-templates" className="my-4 mx-8">
      {props.templates.map((template) => {
        return (
          <Card key={template.id} className="w-[380px]">
            <CardHeader>
              <CardTitle>{template.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <img src={template.thumbnail} alt={template.name} />
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
