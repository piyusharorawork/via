import { Layer, Segment } from "@/store/project.store.types";

type Props = {
  layers: Layer[];
};

export const LayersTimeline = (props: Props) => {
  if (props.layers.length === 0) return <></>;

  return (
    <section
      id="layers-timeline"
      className="h-full flex flex-col px-2 gap-1 overflow-x-auto"
    >
      <PrimaryLayer layer={props.layers[0]} />
    </section>
  );
};

type PrimaryLayerProps = {
  layer: Layer;
};

const PrimaryLayer = (props: PrimaryLayerProps) => {
  return (
    <section id="primary-layer" className="h-full flex gap-1">
      {props.layer.Segments.map((segment, index) => {
        return (
          <PrimaryLayerSegment key={index} segment={segment} layerIdx={index} />
        );
      })}
    </section>
  );
};

type PrimaryLayerSegmentProps = {
  segment: Segment;
  layerIdx: number;
};

const PrimaryLayerSegment = (props: PrimaryLayerSegmentProps) => {
  return (
    <section
      className="h-full shrink-0 border-2 border-red-950"
      style={{
        width: `calc(${props.segment.End - props.segment.Start} * 10px)`,
      }}
      onClick={() => console.log(props.segment)}
    >
      <img
        src={props.segment.PreviewUrl}
        className="h-full w-auto object-cover block"
        style={{ maxWidth: "100%", margin: "auto" }}
      />
    </section>
  );
};
