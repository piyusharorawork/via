"use client";

import {
  ArrowOutIcon,
  DuplicateIcon,
  EditIcon,
  LeftDirectionIcon,
  PublishIcon,
  ThreeDotsIcon,
  TrashIcon,
} from "@/components/features/icons";

import { useSelector } from "@xstate/store/react";
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
import { useFetchTemplate } from "./use-fetch-template";
import { useDraftSingleTemplateStore } from "./draft-single-template.provider";

export const TemplateHeader = () => {
  const store = useDraftSingleTemplateStore();
  const template = useSelector(store, (state) => state.context.template);
  useFetchTemplate();

  if (!template) return null;

  return (
    <div className="flex h-full relative px-4 py-2">
      <section className="h-full flex items-center">
        <Link href="/draft-templates" className="w-6">
          <LeftDirectionIcon />
        </Link>
      </section>
      <section className=" flex-grow flex justify-center items-center">
        <h1 className="text-xl">{template.name} </h1>
      </section>
      <section className="w-8 h-full flex justify-center items-center">
        <Menubar className="border-none">
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
              <Link href={template.websiteUrl} target="_blank">
                <MenubarItem className="flex items-center gap-2">
                  <ArrowOutIcon />
                  <span>View Original</span>
                </MenubarItem>
              </Link>
              <MenubarItem
                className="flex items-center gap-2"
                onClick={() =>
                  store.send({
                    type: "changeOpenRemoveTemplateDialog",
                    open: true,
                  })
                }
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
