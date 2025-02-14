"use client";

import { Slider } from "@/components/ui/slider";
import { TimelineFrame } from "./timeline-frame";
import { Transition } from "../../data/transitions";
import { useSelector } from "@xstate/store/react";
import { store } from "@/store/store";

import { Progress } from "@/components/ui/progress";

type Props = {
  transitions: Transition[];
  transitionFrames: string[];
  frameCount: number;
  fps: number;
};

export const CardTimeline = (props: Props) => {
  return (
    <section id="card-timeline" className="h-full flex flex-col gap-4 py-2">
      <div className="px-4">
        <FrameSlider frameCount={props.frameCount} />
      </div>
      <div className="grow flex gap-4 overflow-x-scroll">
        {props.transitions.map((transition, index) => {
          return (
            <TimelineFrame
              key={index}
              transitionIdx={index}
              transition={transition}
              transitionFrame={props.transitionFrames[index]}
              fps={props.fps}
            />
          );
        })}
      </div>
    </section>
  );
};

type FrameSliderProps = {
  frameCount: number;
};

const FrameSlider = (props: FrameSliderProps) => {
  const frame = useSelector(store, (state) => state.context.frame);

  return <Progress className="h-1" value={(frame / props.frameCount) * 100} />;
};
