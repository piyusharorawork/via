"use client";
import { PlayIcon } from "@/components/features/icons";
import { PlayerController } from "./player-controller";
import { Ruler } from "./ruler";

export const Timeline = () => {
  return (
    <div className="flex flex-col px-4 h-full py-2">
      <section className="h-8 relative">
        <PlayerController />
      </section>

      <section className="grow w-full flex flex-col-reverse">
        <section className="h-12">
          <Ruler />
        </section>
      </section>

      <section className="h-8"></section>
    </div>
  );
};
