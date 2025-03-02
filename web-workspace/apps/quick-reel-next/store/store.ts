import { Transition } from "@/store/project.store.types";
import { transitions } from "./project.store";

import { createStore } from "@xstate/store";

const getSelectedTransitionIdx = (frame: number) => {
  for (let i = 0; i < transitions.length; i++) {
    if (
      frame >= transitions[i].StartFrame &&
      frame <= transitions[i].EndFrame
    ) {
      return i;
    }
  }
};

type VideoStatus = "not-ready" | "paused" | "playing";

type Context = {
  frame: number;
  selectedTransitionIdx: number;
  videoStatus: VideoStatus;
  videoElement: HTMLVideoElement | null;
  audioElement: HTMLAudioElement | null;
};

const context: Context = {
  frame: 1,
  selectedTransitionIdx: 0,
  videoStatus: "not-ready",
  videoElement: null,
  audioElement: null,
};

export const store = createStore({
  types: {},
  context,
  on: {
    play: ({ videoElement, audioElement }) => {
      if (!videoElement || !audioElement) return {};
      videoElement.play();
      audioElement.play();
      return {};
    },
    pause: ({ videoElement, audioElement }) => {
      if (!videoElement || !audioElement) return {};
      videoElement.pause();
      audioElement.pause();
      return {};
    },
    jumpToTransition: (
      { videoElement, audioElement },
      event: { transition: Transition; fps: number }
    ) => {
      if (!videoElement || !audioElement) return {};

      videoElement.pause();
      audioElement.pause();
      videoElement.currentTime = event.transition.StartFrame / event.fps;
      audioElement.currentTime = event.transition.StartFrame / event.fps;

      return {
        frame: event.transition.StartFrame,
      };
    },

    /**Setters */
    setFrame: ({}, event: { frame: number }) => {
      return {
        frame: event.frame,
        selectedTransitionIdx: getSelectedTransitionIdx(event.frame),
      };
    },
    setVideoStatus: ({}, event: { status: VideoStatus }) => {
      return {
        videoStatus: event.status,
      };
    },
    setVideoElement: ({}, event: { videoElement: HTMLVideoElement }) => {
      return {
        videoElement: event.videoElement,
      };
    },
    setAudioElement: ({}, event: { audioElement: HTMLAudioElement }) => {
      return {
        audioElement: event.audioElement,
      };
    },
  },
});
