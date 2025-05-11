import { useSelector } from "@xstate/store/react";
import { useDraftSingleTemplateStore } from "./draft-single-template.provider";
import { cn } from "@/lib/utils";
import { PREVIEW_FRAME_WIDTH } from "./primary-layer";

// This can be fetched from server
export const PREVIEW_FRAMES_PER_SECOND = 16;

export const Ruler = () => {
  const store = useDraftSingleTemplateStore();
  const timeStamps = useSelector(store, (state) => state.context.timeStamps);

  return (
    <div className="h-full flex overflow-hidden ">
      <section className="w-12  shrink-0"></section>
      <section className="grow  flex  px-4">
        {timeStamps.map((timestamp) => {
          return (
            <div
              key={timestamp}
              className="shrink-0 flex flex-col gap-0.5"
              style={{
                width: PREVIEW_FRAME_WIDTH * 4 * PREVIEW_FRAMES_PER_SECOND,
              }}
            >
              <div className="w-1 bg-gray-950 h-4" />
              <span className="text-sm">{timestamp}s</span>
            </div>
          );
        })}
        <div className="flex flex-col gap-0.5">
          <div className="w-1 bg-gray-950 h-4" />
          <span className="text-sm">{timeStamps.length}s</span>
        </div>
      </section>
    </div>
  );
};
