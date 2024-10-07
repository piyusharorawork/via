import { Text, DragControls, Text3D } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { Mesh, Vector3 } from "three";

type Props = {
  text: string;
  initialPosition: [number, number, number];
  color: string;
  fontSize: number;
  font: string;

  onClick: () => void;
  onPositionChanged: (position: [number, number, number]) => void;
};

// TODO remove global
const position = new Vector3();

const DIV_FACTOR = 24;

export const Title = (props: Props) => {
  // TODO Title is rerendering even though text is not changing
  // this is bacuse parent is rerendering
  const [initial, setInitialPosition] = useState<[number, number, number]>([
    0, 0, 0,
  ]);

  useEffect(() => {
    setInitialPosition(props.initialPosition);
  }, []);

  return (
    <DragControls
      onDrag={(wordMat) => {
        position.setFromMatrixPosition(wordMat);
      }}
      onDragEnd={() =>
        props.onPositionChanged([position.x, position.y, position.z])
      }
    >
      <Text3D
        font={`/${props.font}.json`}
        position={initial}
        scale={[
          props.fontSize / DIV_FACTOR,
          props.fontSize / DIV_FACTOR,
          props.fontSize / DIV_FACTOR,
        ]}
        onClick={() => props.onClick()}
      >
        {props.text}
        <meshBasicMaterial color={props.color} />
      </Text3D>
    </DragControls>
  );
};
