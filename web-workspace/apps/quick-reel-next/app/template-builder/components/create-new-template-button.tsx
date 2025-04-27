"use client";
import { PlusIcon } from "@/components/features/icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { CreateTemplateForm } from "./create-template-form";

export const CreateNewTemplateButton = () => {
  return (
    <Dialog>
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
            <section className="relative">
              <CreateTemplateForm />
            </section>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
