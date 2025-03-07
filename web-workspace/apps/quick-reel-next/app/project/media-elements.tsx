"use client";
import { useSelector } from "@xstate/store/react";

import { projectStore } from "@/store/project.store";
import { Layer } from "@/store/project.store.types";
import { SegmentElement } from "./segment-element";

export const MediaElements = () => {
  const layers = useSelector(projectStore, (state) => state.context.layers);

  return (
    <div className="absolute h-full w-full invisible bg-red-500 ">
      {layers.map((layer, index) => {
        return <LayerElement key={index} layer={layer} layerIdx={index} />;
      })}
    </div>
  );
};

type LayerElementProps = {
  layer: Layer;
  layerIdx: number;
};

const LayerElement = (props: LayerElementProps) =>
  props.layer.Segments.map((segment, index) => (
    <SegmentElement
      key={index}
      layerIdx={props.layerIdx}
      segmentIdx={index}
      segment={segment}
    />
  ));
