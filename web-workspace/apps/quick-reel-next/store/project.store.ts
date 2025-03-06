import { createStore } from "@xstate/store";
import * as THREE from "three";
import { Layer, Segment } from "./project.store.types";
import layersJSON from "@/data/layers.json";

type Context = {
  layers: Layer[];
  currentSegments: Segment[];
};

const FPS = 30;

export const layers = layersJSON as Layer[];

const context: Context = {
  layers,
  currentSegments: [],
};

export const projectStore = createStore({
  context,
  on: {
    addVideoElement: (
      { layers },
      event: {
        video: HTMLVideoElement;
        segmentIdx: number;
        layerIdx: number;
      }
    ) => {
      const layer = layers[event.layerIdx];
      const segment = layer.Segments[event.segmentIdx];
      if (segment.Content.Type !== "video") {
        console.error(
          `segment type is not video segmentIdx : ${event.segmentIdx} , layerIdx :${event.layerIdx}`
        );
        return { layers };
      }

      const texture = new THREE.VideoTexture(event.video);
      segment.Content.texture = texture;
      return { layers };
    },
    addImageElement: (
      { layers },
      event: {
        imageUrl: string;
        segmentIdx: number;
        layerIdx: number;
      }
    ) => {
      const layer = layers[event.layerIdx];
      const segment = layer.Segments[event.segmentIdx];
      if (segment.Content.Type !== "image") {
        console.error(
          `segment type is not image segmentIdx : ${event.segmentIdx} , layerIdx :${event.layerIdx}`
        );
        return { layers };
      }

      const textureLoader = new THREE.TextureLoader();
      const texture = textureLoader.load(event.imageUrl);

      segment.Content.texture = texture;
      return { layers };
    },
    changeFrame: ({ layers }, event: { frame: number }) => {
      const currentSegments: Segment[] = [];
      for (let layerIdx = 0; layerIdx < layers.length; layerIdx++) {
        const layer = layers[layerIdx];
        for (
          let segmentIdx = 0;
          segmentIdx < layer.Segments.length;
          segmentIdx++
        ) {
          const segment = layer.Segments[segmentIdx];
          if (event.frame < segment.Start || event.frame > segment.End)
            continue;
          if (segment.Content.Type === "video") {
            const videoElement = segment.Content.texture.source
              .data as HTMLVideoElement;
            const frame = event.frame - segment.Start;
            videoElement.currentTime = frame / FPS;
          }

          if (segment.Content.Type === "dissolve") {
            const prevSegment = layer.Segments[segmentIdx - 1];
            const nextSegment = layer.Segments[segmentIdx + 1];

            if (
              prevSegment.Content.Type === "empty" ||
              prevSegment.Content.Type === "dissolve"
            ) {
              console.error("prev segment is empty");
              return { layers };
            }

            if (
              nextSegment.Content.Type === "empty" ||
              nextSegment.Content.Type === "dissolve"
            ) {
              console.error("next segment is empty");
              return { layers };
            }

            const prevTexture = prevSegment.Content.texture;
            const nextTexture = nextSegment.Content.texture;
            const progress =
              (event.frame - segment.Start) / (segment.End - segment.Start);
            segment.Content.progress = progress;
            segment.Content.prevTexture = prevTexture;
            segment.Content.nextTexture = nextTexture;
          }

          currentSegments.push(segment);
        }
      }

      return { currentSegments };
    },
  },
});
