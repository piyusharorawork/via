import {
  ImageSegmentContent,
  VideoSegmentContent,
} from "@/store/project.store.types";
import { updateTexture } from "./update-texture";

type Props = {
  content: ImageSegmentContent | VideoSegmentContent;
  frameWidth: number;
  frameHeight: number;
};

export const MediaContent = (props: Props) => {
  updateTexture(
    props.content.texture,
    props.content.Region,
    props.frameWidth,
    props.frameHeight
  );

  return (
    <mesh
      position={[
        (props.frameWidth / 2) * props.content.Region.X,
        (props.frameHeight / 2) * props.content.Region.Y,
        0,
      ]}
    >
      <planeGeometry
        args={[
          props.frameWidth * props.content.Region.Width,
          props.frameHeight * props.content.Region.Height,
        ]}
      />

      <meshBasicMaterial map={props.content.texture} />
    </mesh>
  );
};
