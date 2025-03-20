import { store } from "@/store/store";

import { Loader } from "./loader";
import { useSelector } from "@xstate/store/react";
import clsx from "clsx";
import { useLoadVideo } from "@/lib/use-load-video";
import { projectStore } from "@/store/project.store";

type Props = {
  fps: number;
  videoUrl: string;
};

export const EditorPreviewVideo = (props: Props) => {
  const videoRef = useLoadVideo((video) =>
    store.send({ type: "setVideoElement", videoElement: video })
  );
  const videoStatus = useSelector(store, (state) => state.context.videoStatus);
  const layers = useSelector(projectStore, (state) => state.context.layers);

  return (
    <main className="relative">
      <video
        className={clsx("h-full w-auto object-contain rounded-xl", {
          "blur-sm": videoStatus === "not-ready",
        })}
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
            layers,
          });
        }}
        onPlaying={() =>
          store.send({ type: "setVideoStatus", status: "playing" })
        }
        onPause={() => store.send({ type: "setVideoStatus", status: "paused" })}
        onEnded={() => console.log("ended")}
      >
        <source src={props.videoUrl} type="video/mp4" />
      </video>

      {videoStatus === "not-ready" && (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
          <Loader />
        </div>
      )}
    </main>
  );
};
