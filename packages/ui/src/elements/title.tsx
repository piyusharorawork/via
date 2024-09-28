import { Text } from "@react-three/drei";

type Props = {
  text: string;
};

export const Title = (props: Props) => {
  return (
    <Text
      position={[0, 3, 0]}
      fontSize={1}
      color="white"
      anchorX="center"
      anchorY="middle"
    >
      {props.text}
    </Text>
  );
};
