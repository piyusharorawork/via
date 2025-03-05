"use client";
import { useLoadVideo } from "@/lib/use-load-video";

import { projectStore } from "@/store/project.store";
import { useLoadImage } from "@/lib/use-load-image";
import { Segment } from "@/store/project.store.types";

type Props = {
  segment: Segment;
  layerIdx: number;
  segmentIdx: number;
};

export const SegmentElement = (props: Props) => {
  if (props.segment.Content.Type === "empty") {
    return <div className="w-full h-full absolute bg-gray-950"></div>;
  }

  if (props.segment.Content.Type === "image") {
    return (
      <ImageElement
        layerIdx={props.layerIdx}
        segmentIdx={props.segmentIdx}
        imgUrl={props.segment.Content.Url}
      />
    );
  }

  if (props.segment.Content.Type === "video") {
    return (
      <VideoElement
        layerIdx={props.layerIdx}
        videoUrl={props.segment.Content.Url}
        segmentIdx={props.segmentIdx}
      />
    );
  }
};

type VideoElementProps = {
  segmentIdx: number;
  layerIdx: number;
  videoUrl: string;
};

const VideoElement = (props: VideoElementProps) => {
  const videoRef = useLoadVideo((video) => {
    projectStore.send({
      type: "addVideoElement",
      video,
      segmentIdx: props.segmentIdx,
      layerIdx: props.layerIdx,
    });
  });

  return (
    <video
      className="w-full h-full absolute"
      ref={videoRef}
      src={props.videoUrl}
      playsInline
      crossOrigin="anonymous"
    />
  );
};

type ImageElementProps = {
  layerIdx: number;
  segmentIdx: number;
  imgUrl: string;
};

const ImageElement = (props: ImageElementProps) => {
  const imageRef = useLoadImage((image) => {
    projectStore.send({
      type: "addImageElement",
      imageUrl: props.imgUrl,
      segmentIdx: props.segmentIdx,
      layerIdx: props.layerIdx,
    });
  });
  return (
    <img ref={imageRef} className="w-full h-full absolute" src={props.imgUrl} />
  );
};
