import { PlusIcon } from "@/components/features/icons";
import { Button } from "@/components/ui/button";
import { useDraftSingleTemplateStore } from "./draft-single-template.provider";
import { useSelector } from "@xstate/store/react";

export const PrimaryLayer = () => {
  const store = useDraftSingleTemplateStore();
  const template = useSelector(store, (state) => state.context.template);

  if (!template) return null;

  return (
    <div className="flex h-full ">
      <section className="w-32  shrink-0 flex justify-center items-center">
        <Button className="flex" size="sm">
          <PlusIcon />
          <span>Add Layer</span>
        </Button>
      </section>
      <section className="grow  flex px-4">
        {template.previewFrames.map((previewFrame) => {
          return (
            <img
              src={previewFrame.previewUrl}
              key={previewFrame.frameNo}
              className="w-8 border-2 border-gray-950 select-none pointer-events-none"
            />
          );
        })}
      </section>
    </div>
  );
};
