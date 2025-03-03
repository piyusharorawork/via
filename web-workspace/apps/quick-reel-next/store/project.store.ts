import { createStore } from "@xstate/store";
import * as THREE from "three";
import { Layer, Transition } from "./project.store.types";
import transitionsJSON from "@/data/transitions.json";
import layersJSON from "@/data/layers.json";

type Context = {
  layers: Layer[];
  transitions: Transition[];
  transition: Transition | null;
};

const FPS = 30;

export const transitions = transitionsJSON as Transition[];

const context: Context = {
  layers: layersJSON as Layer[],
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
      const info = transitions[event.transitionIdx].Info;
      if (!info) return { transitions };

      const videoTexture = new THREE.VideoTexture(event.video);
      info.Content[event.contentIdx].texture = videoTexture;
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
      const info = transitions[event.transitionIdx].Info;
      if (!info) return { transitions };
      const content = info.Content;
      if (!content) return { transitions };

      const textureLoader = new THREE.TextureLoader();
      const texture = textureLoader.load(event.imageUrl);
      info.Content[event.contentIdx].texture = texture;

      return { transitions };
    },
    changeFrame: ({ transitions }, event: { frame: number }) => {
      const transition = transitions.find(
        (transition) =>
          event.frame >= transition.StartFrame &&
          event.frame <= transition.EndFrame
      );

      if (transition) {
        const info = transition.Info;
        if (!info) return { transitions };

        for (const content of info.Content) {
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
