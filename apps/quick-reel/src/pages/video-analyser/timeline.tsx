import { Slider } from "@/components/ui/slider";
import { useState } from "react";

type Props = {
  frameCount: number;
  onFrameChange: (frame: number) => void;
};

export const Timeline = (props: Props) => {
  const [frame, setFrame] = useState(1);

  return (
    <div className="flex flex-col ">
      <Slider
        defaultValue={[frame]}
        min={1}
        max={props.frameCount}
        step={1}
        className="mt-8"
        onValueChange={(values) => {
          setFrame(values[0]);
          props.onFrameChange(values[0]);
        }}
      />

      <span className="mt-8 text-3xl text-center">{frame}</span>
    </div>
  );
};
