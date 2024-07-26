type Props = {
  videoURL: string;
};

export const VideoPreview = (props: Props) => {
  return (
    <div className="w-full flex justify-center">
      <div className="mobile rounded-2xl bg-gray-950 flex items-center justify-center p-2">
        <video className="h-full wf" controls loop>
          <source src={props.videoURL} type="video/mp4" />
        </video>
      </div>
    </div>
  );
};
