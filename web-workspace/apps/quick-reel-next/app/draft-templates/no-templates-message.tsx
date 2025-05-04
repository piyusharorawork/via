"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useSelector } from "@xstate/store/react";
import { useDraftTemplatesStore } from "./draft-templates.provider";

export const NoTemplatesMessage = () => {
  const store = useDraftTemplatesStore();
  const templates = useSelector(store, (state) => state.context.templates);

  if (templates.length > 0) {
    return null;
  }

  return (
    <div className="h-full absolute w-full flex justify-center items-center">
      <span className="text-xl">You have not created any templates yet 😥</span>

      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};
