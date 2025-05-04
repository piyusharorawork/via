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
import { DraftSingleTemplateState } from "./draft-single-template.store";

export const TemplateRemoveDialog = () => {
  const store = useDraftSingleTemplateStore();
  const state = useSelector(store, (state) => state.context.state);
  const { deleteTemplate } = useRemoveTemplate();

  if (state !== DraftSingleTemplateState.REMOVE_TEMPLATE_DIALOG_OPENED) {
    return null;
  }

  return (
    <AlertDialog open>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete your template and remove your data from
            our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => store.send({ type: "clickCancelRemoveTemplate" })}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteTemplate()}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
