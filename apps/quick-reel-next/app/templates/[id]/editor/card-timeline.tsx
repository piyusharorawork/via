"use client";

import { Slider } from "@/components/ui/slider";
import { TimelineFrame } from "./timeline-frame";
import { Transition } from "../../data/transitions";
import { useSelector } from "@xstate/store/react";
import { store } from "@/store/store";

type Props = {
  transitions: Transition[];
  transitionFrames: string[];
  frameCount: number;
};

export const CardTimeline = (props: Props) => {
  return (
    <section id="card-timeline" className="h-48 flex flex-col gap-4">
      <FrameSlider frameCount={props.frameCount} />
      <div className="grow flex gap-4 overflow-x-scroll">
        {props.transitions.map((transition, index) => {
          return (
            <TimelineFrame
              key={index}
              transitionIdx={index}
              transition={transition}
              transitionFrame={props.transitionFrames[index]}
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
    <Slider
      defaultValue={[frame]}
      value={[frame]}
      min={1}
      max={props.frameCount}
      onValueChange={(values) =>
        store.send({ type: "jumpToFrame", frame: values[0] })
      }
    />
  );
};
