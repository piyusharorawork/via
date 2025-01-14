import { useEffect, useRef, useState } from "react";

type Props = { frameNumber: number; fps: number };

export const FrameImage = (props: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imgURL, setImgURL] = useState<string | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = props.frameNumber / props.fps;

    const handleSeeked = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const context = canvas.getContext("2d");
      if (!context) return;

      const video = videoRef.current;
      if (!video) return;

      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageDataUrl = canvas.toDataURL("image/png");
      setImgURL(imageDataUrl);
    };

    video.addEventListener("seeked", handleSeeked);
    return () => {
      video.removeEventListener("seeked", handleSeeked);
    };
  }, [props.frameNumber, props.fps, videoRef.current]);

  return (
    <>
      <video
        ref={videoRef}
        className="hidden"
        crossOrigin="anonymous"
        onSeeked={() => {
          const canvas = canvasRef.current;
          if (!canvas) return;

          const context = canvas.getContext("2d");
          if (!context) return;

          const video = videoRef.current;
          if (!video) return;

          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          const imageDataUrl = canvas.toDataURL("image/png");
          setImgURL(imageDataUrl);
        }}
      >
        <source
          src="https://res.cloudinary.com/dmtxtgvsb/video/upload/v1736840303/hotel-highlight-reel-240p.mp4"
          type="video/mp4"
        ></source>
      </video>

      <canvas ref={canvasRef} width={1080} height={1920} className="hidden" />

      {imgURL && <img src={imgURL} className="w-full h-full" />}
    </>
  );
};
