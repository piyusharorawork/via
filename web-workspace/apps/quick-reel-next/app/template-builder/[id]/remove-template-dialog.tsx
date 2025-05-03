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
import { useTemplateBuilderStore } from "../store/template-builder.provider";
import { useSelector } from "@xstate/store/react";
import { TemplateBuilderState } from "../store/template-builder.store";
import { useRemoveTemplate } from "../hooks/use-remove-template";

export const TemplateRemoveDialog = () => {
  const store = useTemplateBuilderStore();
  const state = useSelector(store, (state) => state.context.state);
  const { deleteTemplate } = useRemoveTemplate();

  if (state !== TemplateBuilderState.REMOVE_TEMPLATE_DIALOG_OPENED) {
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
