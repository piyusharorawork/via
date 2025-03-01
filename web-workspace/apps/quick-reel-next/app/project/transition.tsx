"use client";
import { useLoadVideo } from "@/lib/use-load-video";
import { Transition } from "./types";

type Props = {
  transition: Transition;
  transitionIndex: number;
};

export const TransitionElement = (props: Props) => {
  const videoRef = useLoadVideo((video) => {
    // console.log(video);
  });

  if (!props.transition.Info.Content) {
    return <div className="w-full h-full absolute bg-gray-950"></div>;
  }

  return props.transition.Info.Content.map((item, index) => {
    if (item.Kind === "image") {
      return (
        <img
          key={index}
          className="w-full h-full absolute"
          src={item.MediaUrl}
        />
      );
    }

    return (
      <video
        key={index}
        className="w-full h-full absolute"
        ref={videoRef}
        src={item.MediaUrl}
        playsInline
      />
    );
  });
};
