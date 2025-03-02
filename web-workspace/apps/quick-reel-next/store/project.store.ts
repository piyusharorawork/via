import { createStore } from "@xstate/store";
import * as THREE from "three";
import { Transition } from "./project.store.types";
import transitionsJSON from "@/data/transitions.json";

type Context = {
  transitions: Transition[];
  transition: Transition | null;
};

const FPS = 30;

export const transitions = transitionsJSON as Transition[];

const context: Context = {
  transitions,
  transition: null,
};

export const projectStore = createStore({
  context,
  on: {
    addVideoInfo: (
      { transitions },
      event: {
        video: HTMLVideoElement;
        transitionIdx: number;
        contentIdx: number;
      }
    ) => {
      const videoTexture = new THREE.VideoTexture(event.video);
      transitions[event.transitionIdx].Info.Content[event.contentIdx].texture =
        videoTexture;
      return { transitions };
    },
    addImageInfo: (
      { transitions },
      event: {
        imageUrl: string;
        transitionIdx: number;
        contentIdx: number;
      }
    ) => {
      const textureLoader = new THREE.TextureLoader();
      const texture = textureLoader.load(event.imageUrl);
      transitions[event.transitionIdx].Info.Content[event.contentIdx].texture =
        texture;

      return { transitions };
    },
    changeFrame: ({ transitions }, event: { frame: number }) => {
      const transition = transitions.find(
        (transition) =>
          event.frame >= transition.StartFrame &&
          event.frame <= transition.EndFrame
      );

      if (transition) {
        for (const content of transition.Info.Content) {
          if (content.Kind === "video") {
            const videoElement = content.texture?.source
              .data as HTMLVideoElement;
            const frame = event.frame - transition.StartFrame;
            videoElement.currentTime = frame / FPS;
          }
        }
      }

      return { transition };
    },
  },
});
