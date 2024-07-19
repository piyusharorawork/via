import { initTRPC } from "@trpc/server";
import { createVideoStore } from "@via/store/video-store";
// import { z } from "zod";
// import { createVideoInput } from "./inputs.js";
// import { addVideo } from "./handlers.js";
//import { addVideoInput } from "@via/schemas/schema";
import {
  addVideo,
  addVideoInput,
  listVideos,
  listVideosInput,
} from "@via/core/video-manager";

export const t = initTRPC.create();

export const appRouter = t.router({
  addVideo: t.procedure.input(addVideoInput).mutation(async (opts) => {
    console.log(opts);
    await addVideo(opts.input);
  }),
  listVideos: t.procedure.input(listVideosInput).query(async (opts) => {
    console.log(opts);
    await listVideos(opts.input);
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
