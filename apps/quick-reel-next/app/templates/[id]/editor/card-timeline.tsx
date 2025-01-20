"use client";

import { Slider } from "@/components/ui/slider";
import { TimelineFrame } from "./timeline-frame";
import { Transition } from "../../data/transitions";

type Props = {
  transitions: Transition[];
  transitionFrames: string[];
  frameNumber: number;
  frameCount: number;
  onFrameChange: (frameNumber: number) => void;
  onTransitionSelect: (transition: Transition) => void;
};

export const CardTimeline = (props: Props) => {
  return (
    <section id="card-timeline" className="h-48 flex flex-col gap-4">
      <Slider
        defaultValue={[props.frameNumber]}
        value={[props.frameNumber]}
        min={1}
        max={props.frameCount}
        onValueChange={(values) => props.onFrameChange(values[0])}
      />
      <div className="grow flex gap-4 overflow-x-scroll">
        {props.transitions.map((transition, index) => {
          return (
            <TimelineFrame
              key={index}
              isSelected={
                props.frameNumber >= transition.start &&
                props.frameNumber <= transition.end
              }
              transition={transition}
              transitionFrame={props.transitionFrames[index]}
              onTransitionSelect={props.onTransitionSelect}
            />
          );
        })}
      </div>
    </section>
  );
};
