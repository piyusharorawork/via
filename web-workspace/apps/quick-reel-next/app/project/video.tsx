"use client";

import { useLoadVideo } from "@/lib/use-load-video";

type Props = {
  MediaUrl: string;
  transitionIndex: number;
  layoutIndex: number;
};

export const VideoElement = (props: Props) => {
  // TODO common load video hook
  const videoRef = useLoadVideo((video) => console.log(video));

  return (
    <div
      style={{ width: "360px", height: "640px", background: "red" }}
      className="absolute top-0 left-0"
    >
      <video ref={videoRef} src={props.MediaUrl} playsInline />
    </div>
  );
};
