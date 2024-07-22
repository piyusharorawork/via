import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "@via/server/app-router";
import { assign, createActor, fromPromise, setup } from "xstate";
import {
  AddVideoInput,
  ListVideosOutput,
  ViewVideoInput,
  ViewVideoOutput,
} from "@via/core/video-manager";

export const getVideoManagementMachine = (fetch: any) => {
  const trpc = createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: "http://localhost:4000/trpc",
        fetch,
      }),
    ],
  });

  const videoManagementMachine = setup({
    types: {
      context: {} as {
        videos: ListVideosOutput;
        errorMessage: string | null;
        videoDetails: ViewVideoOutput | null;
      },
      events: {} as
        | { type: "LOAD_VIDEOS_PAGE" }
        | { type: "CLICK_NEW_VIDEO_BUTTON" }
        | { type: "CLOSE_ADD_VIDEO_FORM" }
        | { type: "CLICK_ADD_VIDEO"; input: AddVideoInput }
        | { type: "CLICK_VIDEO_ROW"; input: ViewVideoInput },
    },
    actors: {
      listVideos: fromPromise(async () => {
        const videos = await trpc.listVideos.query({ limit: 10 });
        return videos;
      }),
      addVideo: fromPromise<void, AddVideoInput>(async ({ input }) => {
        await trpc.addVideo.mutate(input);
      }),
      viewVideo: fromPromise<ViewVideoOutput, ViewVideoInput>(
        async ({ input }) => {
          const video = await trpc.viewVideo.query(input);
          return video;
        }
      ),
    },
  }).createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgEkARAGQFEBiAcRoBUB9ANUpoHkBlAbQAMAXUSgADgHtYuAC65J+MSAAeiABwAWTSQBsAVl0BGAJyGtJgMwB2XQBoQAT0QAmazpe7dgzS8-r9QRcjAF8QhzQsPEJSSlo6bgAFGgA5VgBBCgoOLm5WADFuACUAWSFRJBApGXlFZTUELR0DYzNdCxt7J0R9axcSQS1vdRdBEyNPUPCQSJwCYhImZmYyFIYcih5eOghFMBICADdJAGt92eiFpZW1ja2EI8lMdFr8cvLlarkFJUqGo0sBhILhMvjMQT8fXUDmcCBBlhIlkGRn06nUJhMLksSM0YQiGDmMUWLBu604mz4dDAACdqZJqSRxAAbF4AM3pqBIF3mpGuqzJuV4D3wx2er3eIk+0m+dT+iABQJBYMCfjcLmh3Thml0JEClk0ln0oN8NkGeJmBMupEy2XJPAKxRKrCSqRoFDoNru3A+lS+r3qiDMRl11iCQesaM0hhhiF0wRI6OsRiCgysaPN3KJnrteUKpWdyRSbroAGEqHwaBksl6HaUfRJpf65Y1tHpDKZzJorLYYwh9H5gX0jEYDer1LoDRnLTzict+V7eAV0mRaO761VGz8AwgR5YTCQDV2I+rDXHLL3h9YBqG3O4TIJdH1NOop1EZ3zbjnF7wAKolks0Lw2zrn6W7Nru+6HiYx7qKeWK9poggIoC0F9PoRgBHG7ivoSCw2vOOY7HsBwiqc5zTlmWQEbkwqii8PwShUDY1GBoANFiV42NYqJot4vToReD7XkE1h3g+T7WDhVokPhn65FStL0oyLKyOy1KcpmeFUXJFK0U89GKIxUosbKbGuDYiKiTx46CPxRgIUhiK6KhLjoZh6r6FJM6yQKFKsL+-6AcBkq+pupmqLGz56F4RqhrunjWIJOqCDe0EohG7QmC+0yada2m+fa+TLqudAgWFvxmQgE7qNFBjQYI8WPg5yHOaJrkYYYHlhNM+CSBAcDKLlxkyhVEUIAAtF0sKTV5RJxDQw1NpV7gIoMKUQqJlguF2Dn9CJSLqKGiEHbNVwktRFK8ItrFjcOlg1V4DVaJ4-bBIlmpYvoJDQZ490mO0RhHbop15bauS1k6LpFhQ13hf8yY1eq97GIhPiAr2+jYoitlmFohi9FoIOzqSC5Liubqw6N-yYwiWjop4ozomiGqwgjwIPiOSbqBMaFTPib5Eh+BV8P5f4AUBlPbiiWN05icapszvbqsGxqCKmfi6ICwM5RRWkUBdPCS82vi9vdwYTNtphq+OW0BETPk1gF4tXaFJlU4giFfT47TBA1hjW+9sLc4ifjjNi95JjY9v5TWRXkzDrsjdumgTN9SLjJiHYNYHiA2A9fidNV6HYd1QA */
    context: {
      videos: [],
      videoDetails: null,
      errorMessage: null,
    },
    initial: "IDLE",
    states: {
      IDLE: {
        on: {
          LOAD_VIDEOS_PAGE: "GETTING_VIDEOS",
          CLICK_NEW_VIDEO_BUTTON: "ADD_VIDEO_FORM_OPENED",
          CLICK_VIDEO_ROW: "LOADING_VIDEO_DETAILS",
        },
      },
      GETTING_VIDEOS: {
        invoke: {
          src: "listVideos",
          onDone: "GETTING_VIDEOS_SUCCESS",
          onError: "GETTING_VIDEOS_FAILED",
        },
      },
      ADD_VIDEO_FORM_OPENED: {
        on: {
          CLICK_ADD_VIDEO: "ADDING_VIDEO",
          CLOSE_ADD_VIDEO_FORM: "IDLE",
        },
      },
      LOADING_VIDEO_DETAILS: {
        invoke: {
          src: "viewVideo",
          input: (data: any) => data.event.input,
          onDone: "VIDEO_DETAILS_SUCCESS",
          onError: "VIDEO_DETAILS_FAILED",
        },
      },
      VIDEO_DETAILS_SUCCESS: {
        entry: assign({
          videoDetails: (data: any) => data.event.output,
          errorMessage: null,
        }),
        after: {
          10: "IDLE",
        },
      },
      VIDEO_DETAILS_FAILED: {
        entry: assign({ errorMessage: (data: any) => data.event.error }),
        after: {
          10: "IDLE",
        },
      },

      GETTING_VIDEOS_FAILED: {
        entry: assign({ errorMessage: (data: any) => data.event.error }),
        after: {
          10: "IDLE",
        },
      },
      GETTING_VIDEOS_SUCCESS: {
        entry: assign({
          videos: (data: any) => data.event.output,
          errorMessage: null,
        }),
        after: {
          10: "IDLE",
        },
      },
      ADDING_VIDEO: {
        invoke: {
          src: "addVideo",
          input: (data: any) => data.event.input,
          onDone: "ADDING_VIDEO_SUCCESS",
          onError: "ADDING_VIDEO_FAILED",
        },
      },
      ADDING_VIDEO_SUCCESS: {
        entry: assign({
          errorMessage: null,
        }),
        after: {
          10: "GETTING_VIDEOS",
        },
      },
      ADDING_VIDEO_FAILED: {
        entry: assign({ errorMessage: (data: any) => data.event.error }),
        after: {
          10: "IDLE",
        },
      },
    },
  });

  return videoManagementMachine;
};

export const getVideoManagementActor = (fetch: any) => {
  const videoManagementMachine = getVideoManagementMachine(fetch);
  const actor = createActor(videoManagementMachine);
  return actor;
};
