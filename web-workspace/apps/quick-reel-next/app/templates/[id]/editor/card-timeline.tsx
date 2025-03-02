"use client";

import { TimelineFrame } from "./timeline-frame";
import { useSelector } from "@xstate/store/react";
import { store } from "@/store/store";

import { AnimatedProgress } from "@/components/ui/animated-progress";
import { Transition } from "@/store/project.store.types";

type Props = {
  transitions: Transition[];
  transitionFrames: string[];
  frameCount: number;
  fps: number;
};

export const CardTimeline = (props: Props) => {
  return (
    <section
      id="card-timeline"
      className="h-full flex flex-col gap-4 py-2 px-4"
    >
      <FrameSlider frameCount={props.frameCount} />
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

  return (
    <AnimatedProgress
      className="h-2"
      value={(frame / props.frameCount) * 100}
    />
  );
};
