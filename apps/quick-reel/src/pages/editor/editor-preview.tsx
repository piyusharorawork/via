import { useEffect, useRef, useState } from "react";

type Props = {
  frameNumber: number;
  fps: number;
};

export const EditorPreview = (props: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [seeking, setSeeking] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (seeking) return;

    video.currentTime = props.frameNumber / props.fps;
  }, [props.frameNumber, videoRef.current, props.fps]);

  return (
    <section id="editor-preview" className="grow flex justify-center">
      <video
        ref={videoRef}
        className="aspect-[9/16] w-[300px] "
        crossOrigin="anonymous"
        onSeeking={() => setSeeking(true)}
        onSeeked={() => setSeeking(false)}
      >
        <source
          src="https://res.cloudinary.com/dmtxtgvsb/video/upload/v1736600178/hotel-highlight-reel-original.mp4"
          type="video/mp4"
        />
      </video>
    </section>
  );
};
