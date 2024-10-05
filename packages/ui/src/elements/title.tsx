import { Text, DragControls } from "@react-three/drei";

type Props = {
  text: string;

  onClick: () => void;
};

export const Title = (props: Props) => {
  // TODO Title is rerendering even though text is not changing
  // this is bacuse parent is rerendering

  return (
    <DragControls onDrag={(e) => {}}>
      <Text
        position={[0, 3, 0.2]}
        fontSize={1}
        color="#fff"
        anchorX="center"
        anchorY="middle"
        onClick={() => props.onClick()}
      >
        {props.text}
      </Text>
    </DragControls>
  );
};
