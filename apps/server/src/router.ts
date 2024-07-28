import { initTRPC } from "@trpc/server";

import {
  addVideoInput,
  listVideosInput,
  removeVideoInput,
  viewVideoInput,
  VideoManager,
  makeVideoInput,
} from "@via/core/video-manager";

export const createRouter = (
  databaseName: string,
  serverBaseURL: string,
  finderURL: string,
  token: string
) => {
  const videoManager = new VideoManager({
    databaseName,
    serverBaseURL,
    finderURL,
    token,
  });
  const t = initTRPC.create();

  const appRouter = t.router({
    addVideo: t.procedure.input(addVideoInput).mutation(async ({ input }) => {
      await videoManager.addVideo(input);
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
      const result = await videoManager.makeVideo(input);
      return result;
    }),
  });

  return appRouter;
};

export const t = initTRPC.create();
