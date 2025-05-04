"use client";
import { PlayIcon } from "@/components/features/icons";
import { PlayerController } from "./player-controller";
import { Ruler } from "./ruler";
import { PrimaryLayer } from "./primary-layer";

export const Timeline = () => {
  return (
    <div className="flex flex-col px-4 h-full py-2">
      <section className="h-8 relative">
        <PlayerController />
      </section>

      <section className="grow w-full flex flex-col-reverse overflow-x-auto gap-1">
        <section className="h-12">
          <Ruler />
        </section>
        <section className="h-20">
          <PrimaryLayer />
        </section>
      </section>

      <section className="h-8"></section>
    </div>
  );
};
