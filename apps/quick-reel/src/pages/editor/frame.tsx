type Props = {
  frameNumber: number;
};

export const Frame = (props: Props) => {
  console.log(props.frameNumber);
  return <div className="h-full bg-red-100"></div>;
};
