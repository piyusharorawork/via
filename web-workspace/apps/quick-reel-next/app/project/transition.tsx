import { ImageElement } from "./image";
import { Transition } from "./types";
import { VideoElement } from "./video";

type Props = {
  transition: Transition;
  transitionIndex: number;
};

export const TransitionElement = (props: Props) => {
  if (!props.transition.Info.Content) {
    return <></>;
  }

  return props.transition.Info.Content.map((item, index) => {
    if (item.Kind === "image") {
      return (
        <ImageElement
          MediaUrl={item.MediaUrl}
          key={index}
          layoutIndex={index}
          transitionIndex={props.transitionIndex}
        />
      );
    }

    return (
      <VideoElement
        MediaUrl={item.MediaUrl}
        key={index}
        transitionIndex={props.transitionIndex}
        layoutIndex={index}
      />
    );
  });
};
