import { PlayIcon } from "@/components/features/icons";

export const PlayerController = () => {
  return (
    <div className="flex flex-col">
      <div className="top-0 left-0 h-full w-full  absolute flex justify-start items-center">
        <span className="text-sm px-2">00:00</span>/
        <span className="text-sm px-2">00:00</span>
      </div>
      <div className="top-0 left-0 h-full w-full  absolute flex justify-center items-center">
        <i className="w-4">
          <PlayIcon />
        </i>
      </div>
    </div>
  );
};
