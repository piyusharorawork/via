import { Transition, transitions } from "@/app/templates/data/transitions";
import { createStore } from "@xstate/store";

const getSelectedTransitionIdx = (frame: number) => {
  for (let i = 0; i < transitions.length; i++) {
    if (frame >= transitions[i].start && frame <= transitions[i].end) {
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
    setFrame: ({}, event: { frame: number }) => {
      return {
        frame: event.frame,
        selectedTransitionIdx: getSelectedTransitionIdx(event.frame),
      };
    },
    setVideoStatus: (
      { videoElement, audioElement },
      event: { status: VideoStatus }
    ) => {
      if (!videoElement || !audioElement) return {};

      if (event.status === "playing") {
        videoElement.play();
        audioElement.play();
      } else if (event.status === "paused") {
        videoElement.pause();
        audioElement.pause();
      }

      return {
        videoStatus: event.status,
      };
    },
    setVideoElement: ({}, event: { videoElement: HTMLVideoElement }) => {
      return {
        videoElement: event.videoElement,
      };
    },
    jumpToTransition: (
      { videoElement, audioElement },
      event: { transition: Transition; fps: number }
    ) => {
      if (!videoElement || !audioElement) return {};

      videoElement.pause();
      audioElement.pause();
      videoElement.currentTime = event.transition.start / event.fps;
      audioElement.currentTime = event.transition.start / event.fps;

      return {
        frame: event.transition.start,
      };
    },
    setAudioElement: ({}, event: { audioElement: HTMLAudioElement }) => {
      return {
        audioElement: event.audioElement,
      };
    },
  },
});
