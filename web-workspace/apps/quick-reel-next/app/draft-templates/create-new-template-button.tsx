"use client";
import { PlusIcon } from "@/components/features/icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { CreateTemplateForm } from "./create-template-form";
import { useDraftTemplatesStore } from "./draft-templates.provider";
import { useSelector } from "@xstate/store/react";
import { Button } from "@/components/ui/button";
import { useCreateTemplate } from "./use-create-template";
import { Loader2 } from "lucide-react";

export const CreateNewTemplateButton = () => {
  const store = useDraftTemplatesStore();
  const createTemplateDialogOpened = useSelector(
    store,
    (state) => state.context.createTemplateDialogOpened
  );
  const { createTemplate, isPending, cancel } = useCreateTemplate();

  return (
    <Dialog
      open={createTemplateDialogOpened}
      onOpenChange={(open) =>
        store.send({ type: "changeTemplateDialogOpened", open })
      }
    >
      <DialogTrigger>
        <a className="flex bg-gray-900 text-slate-200 py-2 px-4 rounded-md hover:bg-gray-700">
          <PlusIcon />
          <span>Create New</span>
        </a>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Fill Template Form</DialogTitle>
          <DialogDescription>
            <CreateTemplateForm />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => {
              cancel();
              store.send({ type: "changeTemplateDialogOpened", open: false });
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              createTemplate();
            }}
            disabled={isPending}
          >
            <CreateTemplateButtonText isPending={isPending} />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const CreateTemplateButtonText = (props: { isPending: boolean }) => {
  if (!props.isPending) {
    return <span>Create</span>;
  }

  return (
    <span className="flex justify-center items-center gap-1">
      <Loader2 className="animate-spin" />
      Creating
    </span>
  );
};
