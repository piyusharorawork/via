import { initTRPC } from "@trpc/server";
import { createVideoStore } from "@via/store/video-store";
// import { z } from "zod";
// import { createVideoInput } from "./inputs.js";
// import { addVideo } from "./handlers.js";
//import { addVideoInput } from "@via/schemas/schema";
import {
  addVideoInput,
  addVideo,
} from "../../../packages/workflow/dist/add-video/add-video.js";

export const t = initTRPC.create();

export const appRouter = t.router({
  addVideo: t.procedure.input(addVideoInput).mutation(async (opts) => {
    await addVideo(opts.input);
  }),
  listVideos: t.procedure.query(async () => {
    const databaseName = process.env.DATABASE_NAME;
    const videoStore = createVideoStore();
  }),

  //   getUser: t.procedure.input(z.number()).query((opts) => {
  //     opts.input;
  //     return { id: opts.input, name: "Piyush" };
  //   }),
  //   createUser: t.procedure
  //     .input(z.object({ name: z.string().min(5) }))
  //     .mutation(async (opts) => {
  //       return {
  //         userId: 199,
  //         name: opts.input.name,
  //       };
  //     }),
  // addVideo: t.procedure.input(addVideoInput).mutation(async (opts) => {
  //   await addVideo(opts.input);
  // }),
});

export type AppRouter = typeof appRouter;
