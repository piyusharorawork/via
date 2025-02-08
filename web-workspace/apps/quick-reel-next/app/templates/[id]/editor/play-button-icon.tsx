import { store } from "@/store/store";
import { useSelector } from "@xstate/store/react";
import { PauseIcon, PlayIcon, SpinIcon } from "@/components/features/icons";

export const PlayButtonIcon = () => {
  const videoStatus = useSelector(store, (state) => state.context.videoStatus);

  if (videoStatus === "not-ready")
    return (
      <i className="absolute animate-spin">
        <SpinIcon />
      </i>
    );

  if (videoStatus === "playing") return <PauseIcon />;

  return <PlayIcon />;
};
