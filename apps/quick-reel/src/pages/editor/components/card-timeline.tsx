import { Slider } from "@/components/ui/slider";
import { useStore } from "@/store/store";
import { Transition } from "@/store/transition.store";
import { TimelineFrame } from "./timeline-frame";

type Props = {
  frameNumber: number;
  frameCount: number;
  onFrameChange: (frameNumber: number) => void;
  onTransitionSelect: (transition: Transition) => void;
};

export const CardTimeline = (props: Props) => {
  const transitions = useStore((state) => state.transitions);
  const transitionFrames = useStore((state) => state.transitionFrames);

  return (
    <section id="card-timeline" className="h-64 flex flex-col gap-4">
      <Slider
        defaultValue={[props.frameNumber]}
        min={1}
        max={props.frameCount}
        onValueChange={(values) => props.onFrameChange(values[0])}
      />
      {props.frameNumber}

      <div className="grow flex gap-4 overflow-x-scroll">
        {transitions.map((transition, index) => {
          return (
            <TimelineFrame
              key={index}
              isSelected={
                props.frameNumber >= transition.start &&
                props.frameNumber <= transition.end
              }
              transition={transition}
              transitionFrame={transitionFrames[index]}
              onTransitionSelect={props.onTransitionSelect}
            />
          );
        })}
      </div>
    </section>
  );
};
