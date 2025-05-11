"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useSelector } from "@xstate/store/react";
import { useDraftSingleTemplateStore } from "./draft-single-template.provider";

import { useRemoveTemplate } from "./use-remove-template";
import { Loader2 } from "lucide-react";

export const TemplateRemoveDialog = () => {
  const store = useDraftSingleTemplateStore();
  const { deleteTemplate, isPending } = useRemoveTemplate();
  const openRemoveTemplateDialog = useSelector(
    store,
    (state) => state.context.openRemoveTemplateDialog
  );

  return (
    <AlertDialog
      open={openRemoveTemplateDialog}
      onOpenChange={(open) =>
        store.send({ type: "changeOpenRemoveTemplateDialog", open })
      }
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete your template and remove your data from
            our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => {}}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteTemplate()}>
            <TemplateRemoveDialogText isPending={isPending} />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const TemplateRemoveDialogText = (props: { isPending: boolean }) => {
  if (!props.isPending) {
    return <span>Continue</span>;
  }

  return (
    <span className="flex justify-center items-center gap-1">
      <Loader2 className="animate-spin" />
      Deleting ...
    </span>
  );
};
