"use client";
import { useLoadVideo } from "@/lib/use-load-video";
import { Transition } from "./types";
import { projectStore } from "@/store/project.store";
import { useLoadImage } from "@/lib/use-load-image";

type Props = {
  transition: Transition;
  transitionIndex: number;
};

export const TransitionElement = (props: Props) => {
  if (!props.transition.Info.Content) {
    return <div className="w-full h-full absolute bg-gray-950"></div>;
  }

  return props.transition.Info.Content.map((item, index) => {
    if (item.Kind === "image") {
      return (
        <ImageElement
          key={index}
          contentIdx={index}
          transitionIdx={props.transitionIndex}
          imgUrl={item.MediaUrl}
        />
      );
    }

    return (
      <VideoElement
        key={index}
        contentIdx={index}
        transitionIdx={props.transitionIndex}
        videoUrl={item.MediaUrl}
      />
    );
  });
};

type VideoElementProps = {
  transitionIdx: number;
  contentIdx: number;
  videoUrl: string;
};

const VideoElement = (props: VideoElementProps) => {
  const videoRef = useLoadVideo((video) => {
    projectStore.send({
      type: "addVideoInfo",
      video,
      transitionIdx: props.transitionIdx,
      contentIdx: props.contentIdx,
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
  transitionIdx: number;
  contentIdx: number;
  imgUrl: string;
};

const ImageElement = (props: ImageElementProps) => {
  const imageRef = useLoadImage((image) => {
    projectStore.send({
      type: "addImageInfo",
      imageUrl: props.imgUrl,
      transitionIdx: props.transitionIdx,
      contentIdx: props.contentIdx,
    });
  });
  return (
    <img ref={imageRef} className="w-full h-full absolute" src={props.imgUrl} />
  );
};
