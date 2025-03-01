"use client";
import { useSelector } from "@xstate/store/react";
import { TransitionElement } from "./transition";

import { projectStore } from "@/store/project.store";

export const MediaElements = () => {
  const transitions = useSelector(
    projectStore,
    (state) => state.context.transitions
  );

  return (
    <div className="absolute h-full w-full invisible bg-red-500 ">
      {transitions.map((transition, index) => {
        return (
          <TransitionElement
            key={index}
            transition={transition}
            transitionIndex={index}
          />
        );
      })}
    </div>
  );
};
