import { initTRPC } from "@trpc/server";
import { z } from "zod";

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
});

export type AppRouter = typeof appRouter;
