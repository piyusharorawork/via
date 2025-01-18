import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Transition } from "@/store/transition.store";

type Props = {
  transition: Transition;
  transitionFrame: string;
  isSelected: boolean;
  onTransitionSelect: (transition: Transition) => void;
};

export const TimelineFrame = (props: Props) => {
  return (
    <Card
      className={cn(
        "cursor-pointer aspect-[9/16] h-full border-4 shrink-0 border-gray-800",
        props.isSelected ? "border-green-400" : "border-gray-900"
      )}
      onClick={() => props.onTransitionSelect(props.transition)}
    >
      <img src={props.transitionFrame} className="w-full h-full" />
    </Card>
  );
};
