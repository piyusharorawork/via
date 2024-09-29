import { Text, DragControls } from "@react-three/drei";

type Props = {
  text: string;
};

export const Title = (props: Props) => {
  return (
    <DragControls>
      <Text
        position={[0, 3, 0.1]}
        fontSize={1.1}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        {props.text}
      </Text>
      <Text
        position={[0, 3, 0.2]}
        fontSize={1}
        color="#fff"
        anchorX="center"
        anchorY="middle"
      >
        {props.text}
      </Text>
    </DragControls>
  );
};
