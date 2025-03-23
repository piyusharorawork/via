import { Layer, Segment } from "@/store/project.store.types";

/*
Number of pixels per frame = 10px (try and error Configurable) 
Number of frames per segment = End - Start 
Height of primary timeline = 109 (try and error depends on padding , can be fetched from ref)
Each Frame aspect ratio = frame width / frame height = 0.5625 (contant)
Now , we will put the preview image such that it takes all the height of primary timeline
Height of preview image = 109px
Width of preview image = 109 * 0.5625 = 61.3px
Number of preview images required = CEIL (Number of frames per segment * number of pixels per frame / Width of preview image )
= CEIL ( (End - Start) * 10 / 61.3)

*/
const PIXELS_PER_FRAME = 10;
const PREVIEW_IMAGE_WIDTH = 61.3;

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
    <section id="primary-layer" className="h-full flex ">
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
      className="h-full shrink-0  border-gray-950"
      style={{
        width: `calc(${props.segment.End - props.segment.Start} * ${PIXELS_PER_FRAME}px)`,
      }}
      onClick={() => console.log(props.segment)}
    >
      <div className="flex h-full ">
        <PreviewFrames segment={props.segment} />
      </div>
    </section>
  );
};

type PreviewFramesProps = {
  segment: Segment;
};

const PreviewFrames = (props: PreviewFramesProps) => {
  const previewImages = getPreviewImages(props.segment);

  if (props.segment.Content.Type === "empty") {
    return <div className="w-full h-full  bg-gray-950"></div>;
  }

  if (props.segment.Content.Type === "dissolve") {
    return <div className="w-full h-full bg-red-300"></div>;
  }

  return previewImages.map((previewImage, index) => {
    return (
      <img
        key={index}
        src={previewImage}
        className="h-full w-auto object-cover block border-1 border-gray-950"
        style={{ maxWidth: "100%", margin: "auto" }}
      />
    );
  });
};

const getPreviewImages = (segment: Segment): string[] => {
  const previewCount = Math.ceil(
    ((segment.End - segment.Start + 1) * PIXELS_PER_FRAME) / PREVIEW_IMAGE_WIDTH
  );

  if (segment.Content.Type === "dissolve" || segment.Content.Type === "empty") {
    return [];
  }

  const previewImages: string[] = [segment.PreviewUrls[0]];

  const frames = [0];

  for (let i = 1; i < previewCount; i++) {
    if (segment.Content.Type === "image") {
      const previewUrl = segment.PreviewUrls[0];
      previewImages.push(previewUrl);
    } else {
      const idx = frames[i - 1] + 6;
      const previewUrl = segment.PreviewUrls[idx];
      frames[i] = idx;
      previewImages.push(previewUrl);
    }
  }

  return previewImages;
};
