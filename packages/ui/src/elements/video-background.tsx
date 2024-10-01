import { useState } from "react";
import { VideoTexture } from "three";
import { utils } from "../utils";

type Props = {
  frame: number;
  fps: number;
  videoURL: string;
  width: number;
  height: number;
};

export const VideoBackground = (props: Props) => {
  const [videoTexture, setVideoTexture] = useState<VideoTexture>();

  utils.executeOnce(() => {
    const videoElement = document.createElement("video");
    videoElement.setAttribute("width", props.width.toString());
    videoElement.setAttribute("height", props.height.toString());

    const sourceElement = document.createElement("source");
    sourceElement.setAttribute("src", props.videoURL);
    videoElement.setAttribute("crossorigin", "anonymous");

    videoElement.appendChild(sourceElement);

    const vt = new VideoTexture(videoElement);
    vt.source.data.pause();
    setVideoTexture(vt);
  });

  if (videoTexture) {
    const timeToMove = props.frame / props.fps; // FPS of the video which we cannot change
    videoTexture.source.data.currentTime = timeToMove;
  }

  return (
    <mesh>
      <planeGeometry attach="geometry" args={[4, 7.4]} />
      <meshBasicMaterial attach="material" map={videoTexture} />
    </mesh>
  );
};
