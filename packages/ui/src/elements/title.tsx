import { Text, DragControls } from "@react-three/drei";
import { useEffect, useState } from "react";
import { Vector3 } from "three";

type Props = {
  text: string;
  initialPosition: [number, number, number];
  color: string;
  fontSize: number;

  onClick: () => void;
  onPositionChanged: (position: [number, number, number]) => void;
};

const position = new Vector3();

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
      <Text
        position={initial}
        fontSize={props.fontSize / 16}
        color={props.color}
        anchorX="center"
        anchorY="middle"
        onClick={() => props.onClick()}
      >
        {props.text}
      </Text>
    </DragControls>
  );
};
