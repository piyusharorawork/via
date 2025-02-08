type Props = {
  frameNumber: number;
};

export const Frame = (props: Props) => {
  console.log(props.frameNumber);
  return <canvas className="w-full h-full bg-red-100"></canvas>;
};
