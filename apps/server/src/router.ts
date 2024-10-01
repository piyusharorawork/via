import { initTRPC } from "@trpc/server";

import {
  addVideoInput,
  listVideosInput,
  removeVideoInput,
  viewVideoInput,
  VideoManager,
  makeVideoInput,
  generateReelInput,
} from "@via/core/video-manager";

// TODO create router input
export const createRouter = (
  databaseName: string,
  serverBaseURL: string,
  finderURL: string,
  token: string,
  model: string
) => {
  const videoManager = new VideoManager({
    databaseName,
    serverBaseURL,
    finderURL,
    token,
    model,
  });
  const t = initTRPC.create();

  const appRouter = t.router({
    addVideo: t.procedure.input(addVideoInput).mutation(async ({ input }) => {
      const video = await videoManager.addVideo(input);
      return video;
    }),
    listVideos: t.procedure.input(listVideosInput).query(async ({ input }) => {
      const videos = await videoManager.listVideos(input);
      return videos;
    }),
    removeVideo: t.procedure
      .input(removeVideoInput)
      .mutation(async ({ input }) => {
        await videoManager.removeVideo(input);
      }),

    viewVideo: t.procedure.input(viewVideoInput).query(async ({ input }) => {
      const video = await videoManager.viewVideo(input);
      return video;
    }),
    makeVideo: t.procedure.input(makeVideoInput).query(async ({ input }) => {
      console.log("deprate make video query");
      const result = await videoManager.makeVideo(input);
      return result;
    }),
    // TODO creage a new router for generate reel
    generateVideo: t.procedure
      .input(generateReelInput)
      .query(async ({ input }) => {
        const result = await videoManager.generateReel(input);
        return result;
      }),
  });

  return appRouter;
};

export const t = initTRPC.create();
