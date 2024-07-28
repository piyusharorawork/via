import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "@via/server/app-router";
import { assign, createActor, fromPromise, setup } from "xstate";
import {
  AddVideoInput,
  ListVideosOutput,
  RemoveVideoInput,
  RemoveVideoOutput,
  ViewVideoInput,
  ViewVideoOutput,
  MakeVideoInput,
  MakeVideoOutput,
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
        originalVideos: ListVideosOutput;
        errorMessage: string | null;
        videoDetails: ViewVideoOutput | null;
        makeVideoOutput: MakeVideoOutput | null;
      },
      events: {} as  // All the events invoked by user
        | { type: "LOAD_VIDEOS_PAGE" }
        | { type: "CLICK_NEW_VIDEO_BUTTON" }
        | { type: "CLOSE_ADD_VIDEO_FORM" }
        | { type: "CLICK_ADD_VIDEO"; input: AddVideoInput }
        | { type: "CLICK_VIDEO_ROW"; input: ViewVideoInput }
        | { type: "CLICK_DELETE_VIDEO"; input: ViewVideoInput }
        | { type: "SEARCH_VIDEO"; keyword: string }
        | { type: "GENERATE_VIDEO"; input: MakeVideoInput }
        | { type: "CLOSE_RENDER_MODAL" },
    },
    actors: {
      // All the async services
      listVideos: fromPromise<ListVideosOutput>(async () => {
        // TODO limit can also be taken from UI
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
      deleteVideo: fromPromise<RemoveVideoOutput, RemoveVideoInput>(
        async ({ input }) => {
          const video = await trpc.removeVideo.mutate(input);
          return video;
        }
      ),
      makeVideo: fromPromise<MakeVideoOutput, MakeVideoInput>(
        async ({ input }) => {
          const res = await trpc.makeVideo.query(input);
          return res;
        }
      ),
    },
    actions: {
      // client side filtering
      updateVideosMatchingFilter: assign({
        videos: ({ context, event }) => {
          const e = event as { keyword: string };
          const videos = context.originalVideos.filter((video) => {
            return (
              video.name.includes(e.keyword) ||
              video.description.includes(e.keyword)
            );
          });
          return videos;
        },
      }),
    },
  }).createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgEkARAGQFEBiKgeQEEKB9ANUpsYGU2ACswDiNANoAGALqJQABwD2sXABdcC-LJAAPRACYA7AGYSAVgOnTARiPnzFiQDYANCACeiKwYCcADhJW1t6ORr4WACyOYQC+0a5oWHiEpJS0dADCVGTpANJsAHI0AOqc3IxsAEIAqgAqNYz5kjJIIIrKahpaugiGJnbWthYGDi7uiEZRJN7hElZWenNGeqaRsfEYOATE5NT0mdl5XBQ8bABKjEVNWm2q6pot3b1mFgN2w6ZOrh4IBuH+4cZzIY9BI-KE1iAEptkjs0vtcmxjrQajRSsdGFcWjcOvdQI9jM9LDY3iMvp5THp-IDfACljSjEYIVCkttUvReDRmKd0gAJNE8THyJS3ToPfQE-rEoaksYIRymRxmcxGAGzZZeRlxSEbFkpXZ0USFU7MFH8jHSa7CnFdcV9F5S+wfUbfKwSXwmN1WRxRCSU73TJk6rakACyzByZHywjNdAgGjAJAIADcFABrBPM4MkMMRqNmhDJhSYdA4pqC1pWu42hA08IkCQGX2mWzhbwSSK+MkIV0rEit35RKzhGZ6TXrRJZnOR6NHHh0MAAJwXCgXJDkABsSwAzFeoEiZmFTvOzxgF-Ap4ul6Tl7FVsU14f1xvLFttjtd13ebwkEIrX8q3xfHmQMJxhU4aHyY5TjNNgQ0YChmCoDImA5M4IKg2D4MQm9K1FPFEFrJ8m1fdsoi7XxvCsAJRyWSjHG8AcDBA6FtiPGcyn4AAxZgyFoCg6G0WAVBLBN0C3FRF2QV0iDoA9WPDaczS4ni+Jw9o73whBvFMb8VSMAw5l9AxlgsD89EMEhRwpd1LAY9twmY3USFEOpFJPXhY3jRNzzTDMgxhFyajcjizwvEs7jLC0sVw3EdH0LwJBIQDZkCCRLEcQJTA-awqN8KIQXmLwvBiLU5NIQLgvRDzF2XVcN23Xd9387YKuPELC0vCLryioV1LwuKegSpLfBSj50syj8ZkVBU8q9CijAkfTHEcrNWHYE82E4xhThDNhGAECCaH4+E8jWs01JFWLukIhtiJWN8yNlCYTFsXxrBygy9D8UwVphM6Nq2na9oOwpjpQ1F-rKTbtpDC7rXvL6qPCZt5hCAdiq7IwrG-eYDEcCQ0vCKwwm037tiYVhKpOY4ahUjy40IbyU3TJrQPJlgKCp8oabp0Ki3CjRIuaXrLurG7n2be7SM7WUDIMEhQm8IwvwbRxG3CPQydICnOba9FERoWneOqpcVzXTcVB3Bc9zKkgda5g2jaoXg+c6wXuuFis+qugjH1ul8pffWXHDrbGZgpJYFT+H7Sua0gNp5422F4Kp0nSGheA8wThIkkgxIkhcpIkGTbYTw26eT1P08zuGNIG7TdPCfTDOBOwu1bRK3qM7SZg1wItZIMuneU3ijoEoSRLz8TJOk2S48HqHE+dzaVKO2v+u6BuFabgzXVb0zZWmRKldMGkGyJwrfAH1r2KqlfR-47PJ-zmfi7ntnysNoK9Z4EfVJ6r2osEYLDrLdTKFE3rBHIlRJYiNzLNkiAya+X8ub8BTmnDOWcJ65xfoXWetsb5KUrhgmuADbwb30CAoi4DvpQNlMSUBswDBhDeoBHwTFY4fxIGtLmnlGaFhZrbHhP9TwdQFvgIWlpvbVhsACAIC0vTmXtKETGPgnxtgJgqBKIcB7CNvnOGqZt6qW0akIigut9GiJ8m7CRHspFAM0rI+WNhZiOCUUSFRspKTOLcT4bS+NbLGF0eYh26Dq5YJzqJaeeC35mIsTBMJmD14+27G9OsyxljmFmL6PQj1vj6W-A2DRaUMqNh0ZwlipA9EwW4g-cekSp4FyLiXee1SAarwoMkmR0dLL5Wyd4BY9E9BdhBIleBvRKK-AbFYAeSJDa8IZgmARfkuFzO-pY124jJHRWkfecWd0O5BxdP2H871hwLTxhrMc2pVk0GRLwwxdULZWxtvPNZXNNlXikF0vZfsJYkSOeSR8yM3Fq1-M2dssy7nzJEcQ8J9Tn7ROae-SpJB3mwsSaQz25CUleldD+JYUyBwNmMpNBipzAjnNVlcqF9zYW1L4ginBSL8FvOhesmpHSfmaS3npXeRkTJZXoWrPQw0lYaLesTJwA8ORcl5Lwp+zKmmsq4bK7kPIubcoGkTb8xkbAMhJafKaXZ8a6opG4iYNI3GkwhPgBQEA4BaDKvY+GmkAC0zpEAevrATX1frfXmAHmyF1ddugaw-MMfwytAjmS9P2cyA82JmhDRQuUoIphfXlPZBkFqPxpW-O6XwII9DhycIGipTlwKQRoNBDacEEJUBTbi0EdZGxFqdEBL05g82BDMAyZGxkL5MMTQpERf8jpNpkS2kgbblhOE7fKAwH5iaKnxog70GSGLLQrVmQh7lJ33mxmo0poJvQh2JJNYyUx2xDm0uZItKpgnrShoDXa+1DoUAPZpSw8siajkWh8PKyNvCYxCGYbGDEvxDnOQ5HdMJ7awqXrwL9A1T5I3MvRWw+lAJeC7MZUwlkFoNhBOYNsb0B5Dwrpi5DOyHEDU-K2t0c7BxdqXbKNW35lhhCKr6dtV84PbEo0nBlE7aOuvo9O2dHa5iLq7BohWaVsahCcAZawyDXJjvvnxFDjwVTfibn8SIrYvBno-JavsBT6LaTyljdTHL3JwswTp-QemLOGZDpM0z9DaQzv0n8SkWiFQcPHKitpZRnPdhsFRaZoJCYXqejMAIqVWytlsLkr0T7QlVyc2J0NngMqJRCIYGYxLhjDKer2BkXppkltsgCTL9KOkRbxYVwlJXIgkvK98EthSlhxoWjpPGNqQtOXRZYiL+NFQlpvcjSwFFwjZTSn2AZoRhwEw1Nc22Y2EnZczs1lUziFFuMMB4mWxyr1vlvRSSko5YMjazNt9pD9muSaY9J1jH4iuWVPr8LGHxhh3ZuaitV8qRERZWARt0OlAhvSs929j2MpgDeh-jUIhhYixCAA */
    context: {
      videos: [], //  filtered and displayed in a table
      originalVideos: [], // Synced from backend
      videoDetails: null, // single video with more info to show
      errorMessage: null, // any error message when something went wrong
      makeVideoOutput: null,
    },
    initial: "IDLE",
    states: {
      IDLE: {
        on: {
          LOAD_VIDEOS_PAGE: "GETTING_VIDEOS",
          CLICK_NEW_VIDEO_BUTTON: "ADD_VIDEO_FORM_OPENED",
          CLICK_VIDEO_ROW: "LOADING_VIDEO_DETAILS",
          CLICK_DELETE_VIDEO: "DELETING_VIDEO",
          SEARCH_VIDEO: "SEARCHING_VIDEO",
          GENERATE_VIDEO: "MAKING_VIDEO",
        },
      },
      MAKING_VIDEO: {
        invoke: {
          src: "makeVideo",
          input: (data: any) => data.event.input,
          onDone: "RENDER_VIDEO_MODAL",
          onError: "MAKING_VIDEOS_FAILED",
        },
      },

      RENDER_VIDEO_MODAL: {
        entry: assign({
          makeVideoOutput: (data: any) => data.event.output,
          errorMessage: null,
        }),
        on: {
          CLOSE_RENDER_MODAL: {
            actions: assign({ makeVideoOutput: null }),
            target: "IDLE",
          },
        },
      },
      MAKING_VIDEOS_FAILED: {
        entry: assign({ errorMessage: (data: any) => data.event.error }),
        after: {
          10: "IDLE",
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
          originalVideos: (data: any) => data.event.output,
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
          videoDetails: null,
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
      DELETING_VIDEO: {
        invoke: {
          src: "deleteVideo",
          input: (data: any) => data.event.input,
          onDone: "DELETING_VIDEO_SUCCESS",
          onError: "DELETING_VIDEO_FAILED",
        },
      },
      DELETING_VIDEO_SUCCESS: {
        entry: assign({ errorMessage: null, videoDetails: null }),
        after: {
          10: "GETTING_VIDEOS",
        },
      },
      DELETING_VIDEO_FAILED: {
        entry: assign({ errorMessage: () => "Delete Video Failed !!!" }),
        after: {
          10: "IDLE",
        },
      },
      SEARCHING_VIDEO: {
        entry: "updateVideosMatchingFilter",
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
