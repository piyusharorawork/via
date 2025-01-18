import { Button } from "@/components/ui/button";
import { PauseIcon, PlayIcon } from "@/components/features/icons";
import { useEffect, useState } from "react";

type Props = {
  onIncrement: () => void;
};

export const PlayButton = (props: Props) => {
  const [status, setStatus] = useState<"paused" | "playing">("paused");

  return (
    <section id="play-button" className="flex justify-center items-center">
      <Button
        className="w-16"
        onClick={() => {
          setStatus(status === "paused" ? "playing" : "paused");
        }}
      >
        {status === "paused" ? <PlayIcon /> : <PauseIcon />}
      </Button>
    </section>
  );
};
