"use client";

import {
  DuplicateIcon,
  EditIcon,
  LeftDirectionIcon,
  PublishIcon,
  ThreeDotsIcon,
  TrashIcon,
} from "@/components/features/icons";
import { useDraftTemplatesStore } from "../draft-templates.provider";
import { useSelector } from "@xstate/store/react";
import { useTemplate } from "../hooks/use-template";
import Link from "next/link";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { TemplateRemoveDialog } from "./remove-template-dialog";

export const TemplateHeader = () => {
  const store = useDraftTemplatesStore();
  const templateName = useSelector(
    store,
    (state) => state.context.template?.name
  );
  useTemplate();

  return (
    <div className="flex h-full relative px-4">
      <section className="w-16 h-full flex items-center">
        <Link href="/draft-templates" className="w-12">
          <LeftDirectionIcon />
        </Link>
      </section>
      <section className=" flex-grow flex justify-center items-center">
        <h1 className="text-2xl font-bold">{templateName} </h1>
      </section>
      <section className="w-16 h-full flex justify-center items-center">
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>
              <ThreeDotsIcon />
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem className="flex items-center gap-2">
                <EditIcon />
                <span>Rename</span>
              </MenubarItem>
              <MenubarItem className="flex items-center gap-2">
                <DuplicateIcon />
                <span>Duplicate</span>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem className="flex items-center gap-2">
                <PublishIcon />
                <span>Publish</span>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem
                className="flex items-center gap-2"
                onClick={() => store.send({ type: "clickRemoveTemplate" })}
              >
                <TrashIcon />
                <span>Delete</span>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </section>

      <TemplateRemoveDialog />
    </div>
  );
};
