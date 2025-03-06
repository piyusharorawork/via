import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Segment } from "@/store/project.store.types";
import { store } from "@/store/store";
import { useSelector } from "@xstate/store/react";

type Props = {
  segment: Segment;
  segmentIdx: number;
  fps: number;
};

export const TimelineSegment = (props: Props) => {
  const isSelected = useSelector(
    store,
    (state) => state.context.selectedSegmentIdx === props.segmentIdx
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
          segment: props.segment,
          fps: props.fps,
        });
      }}
    >
      <img
        src={props.segment.PreviewUrl}
        className="w-full h-full"
        draggable={false}
      />
    </Card>
  );
};
