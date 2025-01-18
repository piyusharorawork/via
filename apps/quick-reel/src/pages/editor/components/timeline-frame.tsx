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
  const borderColor = props.isSelected ? "green-400" : "gray-900";
  return (
    <Card
      className={cn(
        "cursor-pointer aspect-[9/16] h-full   border-4 shrink-0",
        `border-${borderColor}`
      )}
      onClick={() => props.onTransitionSelect(props.transition)}
    >
      <img src={props.transitionFrame} className="w-full h-full" />
    </Card>
  );
};
