import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "@via/server/app-router";
import { assign, createActor, fromPromise, setup } from "xstate";
import nodeFetch from "node-fetch";
import { ListVideosOutput } from "@via/core/video-manager";

const videoManagerMachine = setup({
  types: {
    context: {} as { videos: ListVideosOutput },
    events: {} as { type: "INIT" },
  },
  actors: {
    listVideos: fromPromise(async () => {
      const trpc = createTRPCProxyClient<AppRouter>({
        links: [
          httpBatchLink({
            url: "http://localhost:4000/trpc",
            fetch: nodeFetch as any,
          }),
        ],
      });
      const videos = await trpc.listVideos.query({ limit: 10 });
      return videos;
    }),
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgEkARAGQFEBiMgOTIBUBtABgF1FQAHAPaxcAF1wD8vEAA9EAVjkAmEnIAca1QBZFigIwcAnAGZNAGhABPRLsWqSNgOwA2Xc7kcOzzZoC+P82hYeISkAGI0LADCABJMAOIA+lRkAMosCQBqlDQA8il0EBJgJAQAbgIA1sWBOATEJOFRsYyJyWmZ2XkIZQKY6GISnFxDUoLCA5JIMogG7iqaunIGuitGelrmVggrTiSKmqqKBqocqov7Dn4BGLUhDREx8Ump6VkUuflgAE5fAl8kfAANv0AGZ-VAkGrBeqNR4tZ7tN4fbr4cp9CZDEZTMaicSTUCyBAKZRqDTaPSGEybRBnEhrI6KNSGVQOXROAxXEBQuphB7NVovDrvPIJUIAQTItAodGksBE-WK6BBIm+yH0RDo3LusP5CNenRSoolUqx-CEuIkUkJRiMchITk0ak0BicNu02mpCEZRjpbO07iMDgciicHEUnK1ML5Tza+uFhpSAFVIpEaCkUqFE1QZXKFSQlSqvmqOBrI7ymjHBUiRUmU2mM1nTSAcRMrTNjCQHEY-aonF3Zg4DJ7GXZVMcON4HX3vOHOfgBBA4FIy6Nza2poSALROT2bu0GA+Ho+H3sRm7Q0iUWir8Z4tsITQuEgcfRGB02BRaEPDuS6EgGfsu00CcOBcFkzyCHl7greFYyFD4bwtfFpgQVkDE7A9gNOXRbWdIdLBmP93FOIMX10ADDiMCDbijGCBURA0jUlGgKEQ9cCUQD0CK9Gx7XUE5QIcJQDGdaiL2guF6LjD4ElrVN00zKg2LvDdrBWdDDCcfYDldVRcOHXQ7BDftjiWVQ9MuPwfCAA */
  context: {
    videos: [],
  },
  initial: "IDLE",
  states: {
    IDLE: {
      on: {
        INIT: {
          target: "FETCHING_LIST_VIDEOS",
        },
      },
    },
    FETCHING_LIST_VIDEOS: {
      invoke: {
        src: "listVideos",
        onDone: {
          target: "FETCHING_LIST_VIDEOS_SUCCESSFUL",
        },
        onError: {
          target: "FETCHING_LIST_VIDEOS_FAILED",
        },
      },
    },
    FETCHING_LIST_VIDEOS_FAILED: {
      entry: (data: any) => console.error(`Failed Because ` + data.event.error),
      after: {
        10: "IDLE",
      },
    },
    FETCHING_LIST_VIDEOS_SUCCESSFUL: {
      entry: assign({
        videos: (data: any) => data.event.output,
      }),
      after: {
        10: "IDLE",
      },
    },
  },
});

export const videoManagerActor = createActor(videoManagerMachine);
