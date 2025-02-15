import { Button } from "@/components/ui/button";
import { store } from "@/store/store";
import { useSelector } from "@xstate/store/react";
import { PlayButtonIcon } from "./play-button-icon";
import { useLoadAudio } from "./use-load-audio";

type Props = {
  fps: number;
  audioUrl: string;
};

export type VideoStatus = "paused" | "playing";

export const PlayButton = (props: Props) => {
  const audioRef = useLoadAudio();
  const videoStatus = useSelector(store, (state) => state.context.videoStatus);

  return (
    <section id="play-button" className="flex justify-center items-center">
      <audio ref={audioRef} preload="auto" src={props.audioUrl} />
      <Button
        disabled={videoStatus === "not-ready"}
        className="w-16 relative"
        onClick={() => {
          videoStatus === "playing"
            ? store.send({ type: "pause" })
            : store.send({ type: "play" });
        }}
      >
        <PlayButtonIcon />
      </Button>
    </section>
  );
};
