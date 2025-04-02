type Props = {
  videoUrl: string;
};

// https://chatgpt.com/c/67ed12bc-7c90-8006-9fcc-46ff332dd66c
export const FramePreview = (props: Props) => {
  return (
    <video className="absolute w-full h-full object-fit">
      <source src={props.videoUrl} />
    </video>
  );
};
