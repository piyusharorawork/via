import { create } from "zustand";

import { TransitionSlice, useTransitionStore } from "./transition.store";
import {
  useVideoTemplateStore,
  VideoTemplateSlice,
} from "./video-template.store";

export type State = VideoTemplateSlice & TransitionSlice;

export const useStore = create<State>((...a) => ({
  ...useVideoTemplateStore(...a),
  ...useTransitionStore(...a),
}));
