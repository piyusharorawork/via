type Props = {
  MediaUrl: string;
  transitionIndex: number;
  layoutIndex: number;
};

export const ImageElement = (props: Props) => {
  return (
    <div
      style={{ width: "360px", height: "640px", background: "red" }}
      className="absolute top-0 left-0"
    >
      <img src={props.MediaUrl} />
    </div>
  );
};
