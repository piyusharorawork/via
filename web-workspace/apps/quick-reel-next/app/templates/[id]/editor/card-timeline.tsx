"use client";

import { TimelineSegment } from "./timeline-frame";
import { useSelector } from "@xstate/store/react";
import { store } from "@/store/store";

import { AnimatedProgress } from "@/components/ui/animated-progress";
import { Segment } from "@/store/project.store.types";

type Props = {
  segments: Segment[];
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
        {props.segments.map((segment, index) => {
          return (
            <TimelineSegment
              key={index}
              segmentIdx={index}
              segment={segment}
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
