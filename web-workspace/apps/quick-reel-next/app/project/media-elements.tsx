import { TransitionElement } from "./transition";
import { Transition } from "./types";

type Props = {
  transitions: Transition[];
};

export const MediaElements = (props: Props) => {
  return (
    <div className="absolute h-full w-full invisible bg-red-500 ">
      {props.transitions.map((transition, index) => {
        return (
          <TransitionElement transition={transition} transitionIndex={index} />
        );
      })}
    </div>
  );
};
