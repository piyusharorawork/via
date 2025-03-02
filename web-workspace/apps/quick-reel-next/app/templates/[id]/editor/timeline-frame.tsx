import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Transition } from "@/store/project.store.types";
import { store } from "@/store/store";
import { useSelector } from "@xstate/store/react";

type Props = {
  transition: Transition;
  transitionFrame: string;
  transitionIdx: number;
  fps: number;
};

export const TimelineFrame = (props: Props) => {
  const isSelected = useSelector(
    store,
    (state) => state.context.selectedTransitionIdx === props.transitionIdx
  );

  return (
    <Card
      className={cn(
        "cursor-pointer aspect-[9/16] h-full border-4 shrink-0 border-gray-800",
        isSelected ? "border-green-400" : "border-gray-900"
      )}
      onClick={() => {
        store.send({
          type: "jumpToTransition",
          transition: props.transition,
          fps: props.fps,
        });
      }}
    >
      <img
        src={props.transitionFrame}
        className="w-full h-full"
        draggable={false}
      />
    </Card>
  );
};
