import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { createVideoInput } from "./inputs.js";

export const t = initTRPC.create();

export const appRouter = t.router({
  getUser: t.procedure.input(z.number()).query((opts) => {
    opts.input;
    return { id: opts.input, name: "Piyush" };
  }),
  createUser: t.procedure
    .input(z.object({ name: z.string().min(5) }))
    .mutation(async (opts) => {
      return {
        userId: 199,
        name: opts.input.name,
      };
    }),
  createVideo: t.procedure.input(createVideoInput).mutation(async (opts) => {}),
});

export type AppRouter = typeof appRouter;
