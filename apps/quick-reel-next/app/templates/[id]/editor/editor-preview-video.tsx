import { useRef } from "react";
import { useUpdateFrame } from "./use-update-frame";

type Props = {
  fps: number;
  videoUrl: string;
};

export const EditorPreviewVideo = (props: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useUpdateFrame(videoRef, props.fps);

  return (
    <>
      <video ref={videoRef} muted playsInline>
        <source src={props.videoUrl} type="video/mp4" />
      </video>
    </>
  );
};
