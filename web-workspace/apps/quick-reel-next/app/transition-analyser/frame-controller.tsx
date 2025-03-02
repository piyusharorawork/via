"use client";
import { Slider } from "@/components/ui/slider";

type Props = {
  frame: number;
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
        max={422}
      />
      <div className="flex justify-center text-2xl">{props.frame}</div>
    </>
  );
};
