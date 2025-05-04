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
import { useDraftTemplatesStore } from "../draft-templates.provider";
import { useSelector } from "@xstate/store/react";
import { DraftTemplatesState } from "../draft-templates.store";
import { useRemoveTemplate } from "./use-remove-template";

export const TemplateRemoveDialog = () => {
  const store = useDraftTemplatesStore();
  const state = useSelector(store, (state) => state.context.state);
  const { deleteTemplate } = useRemoveTemplate();

  if (state !== DraftTemplatesState.REMOVE_TEMPLATE_DIALOG_OPENED) {
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
