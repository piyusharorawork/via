import { PlusIcon } from "@/components/features/icons";
import { Button } from "@/components/ui/button";
import { useDraftSingleTemplateStore } from "./draft-single-template.provider";
import { useSelector } from "@xstate/store/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const PREVIEW_FRAME_WIDTH = 8;

export const PrimaryLayer = () => {
  const store = useDraftSingleTemplateStore();
  const template = useSelector(store, (state) => state.context.template);

  if (!template) return null;

  return (
    <div className="flex h-full ">
      <section className="w-12  shrink-0 flex justify-center items-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className="flex" size="sm">
                <PlusIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Create a new layer</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </section>
      <section className="grow  flex px-4">
        {template.previewFrames.map((previewFrame) => {
          return (
            <img
              src={previewFrame.previewUrl}
              key={previewFrame.frameNo}
              className="border-2 border-gray-950 select-none pointer-events-none"
              style={{ width: PREVIEW_FRAME_WIDTH * 4 }}
            />
          );
        })}
      </section>
    </div>
  );
};
