import { store } from "@/store/store";
import { useLoadVideo } from "./use-load-video";

type Props = {
  fps: number;
  videoUrl: string;
};

export const EditorPreviewVideo = (props: Props) => {
  const videoRef = useLoadVideo();

  return (
    <>
      <video
        ref={videoRef}
        muted
        playsInline
        onCanPlay={(e) =>
          store.send({
            type: "setVideoStatus",
            status: "paused",
          })
        }
        onTimeUpdate={(e) => {
          store.send({
            type: "setFrame",
            frame: e.currentTarget.currentTime * props.fps,
          });
        }}
      >
        <source src={props.videoUrl} type="video/mp4" />
      </video>
    </>
  );
};
