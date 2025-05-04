import { useSelector } from "@xstate/store/react";
import { useDraftSingleTemplateStore } from "./draft-single-template.provider";

export const Ruler = () => {
  const store = useDraftSingleTemplateStore();
  const timeStamps = useSelector(store, (state) => state.context.timeStamps);

  return (
    <div className="h-full flex overflow-hidden ">
      <section className="w-16  shrink-0"></section>
      <section className="grow  flex overflow-x-auto px-4">
        {timeStamps.map((timestamp) => {
          return (
            <div
              key={timestamp}
              className="w-32 shrink-0 flex flex-col gap-0.5 "
            >
              <div className="w-1 bg-gray-950 h-4" />
              <span className="text-sm">{timestamp}s</span>
            </div>
          );
        })}
      </section>
    </div>
  );
};
