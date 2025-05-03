"use client";

import {
  DuplicateIcon,
  EditIcon,
  LeftDirectionIcon,
  PublishIcon,
  ThreeDotsIcon,
  TrashIcon,
} from "@/components/features/icons";
import { useTemplateBuilderStore } from "../store/template-builder.provider";
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

export const TemplateHeader = () => {
  const store = useTemplateBuilderStore();
  const templateName = useSelector(
    store,
    (state) => state.context.template?.name
  );
  useTemplate();

  return (
    <div className="flex h-full relative">
      <section className="w-8 h-full flex justify-center items-center mx-2 z-10">
        <Link href="/template-builder">
          <LeftDirectionIcon />
        </Link>
      </section>

      <section className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
        <h1 className="text-2xl font-bold">{templateName} </h1>
      </section>

      <section className="absolute top-0 left-0 w-full h-full flex justify-end items-center px-4">
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
              <MenubarItem className="flex items-center gap-2">
                <TrashIcon />
                <span>Delete</span>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </section>
    </div>
  );
};
