import { create } from "zustand";

import { TransitionSlice, useTransitionStore } from "./transition.store";
import {
  useVideoTemplateStore,
  VideoTemplateSlice,
} from "./video-template.store";
import { UserVideoSlice, useUserVideoStore } from "./user-video.store";
import {
  TransitionFrameSlice,
  useTransitionFrameStore,
} from "./transition-frame.store";

export type State = VideoTemplateSlice &
  TransitionSlice &
  UserVideoSlice &
  TransitionFrameSlice;

export const useStore = create<State>((...a) => ({
  ...useVideoTemplateStore(...a),
  ...useTransitionStore(...a),
  ...useUserVideoStore(...a),
  ...useTransitionFrameStore(...a),
}));
