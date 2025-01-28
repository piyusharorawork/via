import { transitions } from "@/app/templates/data/transitions";
import { createStore } from "@xstate/store";

const getSelectedTransitionIdx = (frame: number) => {
  for (let i = 0; i < transitions.length; i++) {
    if (frame >= transitions[i].start && frame <= transitions[i].end) {
      return i;
    }
  }
};

export const store = createStore({
  context: {
    frame: 1,
    selectedTransitionIdx: 0,
  },
  on: {
    incementFrame: ({ frame }) => {
      return {
        frame: frame + 1,
        selectedTransitionIdx: getSelectedTransitionIdx(frame + 1),
      };
    },
    jumpToFrame: ({}, event: { frame: number }) => {
      return {
        frame: event.frame,
        selectedTransitionIdx: getSelectedTransitionIdx(event.frame),
      };
    },
  },
});
