"use client";
import { Slider } from "@/components/ui/slider";

type Props = {
  frame: number;
  frameCount: number;
  onChange: (frame: number) => void;
};

export const FrameController = (props: Props) => {
  return (
    <>
      <Slider
        onValueChange={(values) => {
          props.onChange(values[0]);
        }}
        min={1}
        max={props.frameCount}
      />
      <div className="flex justify-center text-2xl">{props.frame}</div>
    </>
  );
};
