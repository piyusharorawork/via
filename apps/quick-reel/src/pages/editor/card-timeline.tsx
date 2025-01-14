import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useStore } from "@/store/store";
import { FrameImage } from "./frame-image";
import { Transition } from "@/store/transition.store";

type Props = {
  frameNumber: number;
  frameCount: number;
  onFrameChange: (frameNumber: number) => void;
  onTransitionSelect: (transition: Transition) => void;
};

export const CardTimeline = (props: Props) => {
  const transitions = useStore((state) => state.transitions);

  return (
    <section id="card-timeline" className="h-64 flex flex-col gap-4">
      <Slider
        defaultValue={[props.frameNumber]}
        min={1}
        max={props.frameCount}
        onValueChange={(values) => props.onFrameChange(values[0])}
      />

      <div className="grow flex gap-4 overflow-x-scroll">
        {transitions.map((transition, index) => {
          return (
            <Card
              key={index}
              className="cursor-pointer aspect-[9/16] h-full  border-black border-4 shrink-0"
              onClick={() => {
                props.onTransitionSelect(transition);
              }}
            >
              <FrameImage frameNumber={transition.start} fps={30} />
            </Card>
          );
        })}
      </div>
    </section>
  );
};
