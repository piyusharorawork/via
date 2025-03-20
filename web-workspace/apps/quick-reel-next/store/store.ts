import { createStore } from "@xstate/store";
import { Layer, Segment } from "./project.store.types";

const getSelectedSegmentIdx = (layers: Layer[], frame: number) => {
  if (layers.length === 0) return;

  const segments = layers[0].Segments;
  for (let i = 0; i < segments.length; i++) {
    if (frame >= segments[i].Start && frame <= segments[i].End) {
      return i;
    }
  }
};

type VideoStatus = "not-ready" | "paused" | "playing";

type Context = {
  frame: number;
  selectedSegmentIdx: number;
  videoStatus: VideoStatus;
  videoElement: HTMLVideoElement | null;
  audioElement: HTMLAudioElement | null;
};

const context: Context = {
  frame: 1,
  selectedSegmentIdx: 0,
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
      event: { segment: Segment; fps: number }
    ) => {
      if (!videoElement || !audioElement) return {};

      videoElement.pause();
      audioElement.pause();
      videoElement.currentTime = event.segment.Start / event.fps;
      audioElement.currentTime = event.segment.Start / event.fps;

      return {
        frame: event.segment.Start,
      };
    },

    /**Setters */
    setFrame: ({}, event: { frame: number; layers: Layer[] }) => {
      return {
        frame: event.frame,
        selectedTransitionIdx: getSelectedSegmentIdx(event.layers, event.frame),
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
