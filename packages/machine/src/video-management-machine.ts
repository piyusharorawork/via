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
        | { type: "GENERATE_VIDEO"; input: MakeVideoInput },
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
    /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgEkARAGQFEBiKgeQEEKB9ANUpsYGU2ACswDiNANoAGALqJQABwD2sXABdcC-LJAAPRACYA7AGYSAVgOnTE00YBsAFgkAOcwBoQAT0QBGAwE5bEgd-W1snI3sA4wBfaPc0LDxCUkpaOgBhKjJ0gGk2ADkaAHVObkY2ACEAVQAVGsZ8yRkkEEVlNQ0tXQRDE3NLaztHFwN3LwQ7JxI-Iz8-AwdnAyc9U1j4jBwCYnJqekzsvK4KHjYAJUYipq021XVNFu7eswsrG0WRscQDeyn7Y0sfj0elsehcfnWIASW2SuzSB1ybBOtBqNFKJ0Y1xatw6D1AT2MLwG72Gbk8PlMhhIeiM3jCfm8INsfnstkh0KSO1S9F4NGYZ3SAAl0TwsfIlHdOo99IT+m8hs4yeNbKZApYDHpGd5TN4nBIYnEoZtOSk9nRRIUzsxUSLMdIbhLcV0ZX1XoMPkqfM5vC8FrYJLZfOEjEZ2cbtqQALLMHJkfLCW10CAaMAkAgANwUAGtUxyIyRo7H47aEBmFJh0LimmLWo77s6EE57PYSPqJLSJI5LHS-F8EN5rBISJEjIZWTr7OZQ4a87DC3GE8ceHQwAAnVcKVckOQAG0rADNN6gSLOdvPi0vGKX8JmK1XpDWcfXpY3m62DO2B12dcy+wP5tSfhOIyAZNgYH5rDO4ZzjGC62vwvBVOk6Q0LwvB0NosAqJWqboPuKhrsgA5EHQp5RrBF5lAhSEoWhj51lK+KIAyBhmCGLjNt4zZGKM5KNkCQSGL4DisuB2phok+bnouVFsAAYswZC0BQGFYThJB4QRq5ERIJFkQWFEyRi-AKUpNAUPR7TPkxCAsWxRh6n4pgzN4ATeH+wKmCQxiMhEgbLHYBgSTCOyiHUcGXuhyaEGmN7Zrm0GhTQ4WUcZ163pW9zVva2IMXiOj6N4PFBN4rmahqtgOXof46kOCqrBInZAcswUmiQYU1BFVEruum7bnuKiHqux76R1XVpWWd5ZQ+OXilZjEFT0RWsYGZW+CCVV-l2rYOJSlIOGOrX5qw7CXvJjBnJGbCMAINCFCpCJ5CdtqWZK+XdE2LZth2349n2dgmEYpjhHqA4OWEAZHbCz1nXJF1XTdd3mRkTC8mwMNlOdl2vU6L56Ayw42EVznAS4QO2P9rkkIyFjhJErwOVDOxMKw42nCcNSKVQUUprFmY5ieiWkCzFBs+UHNc7w6XlplGjZc0c1vQ2n3vp+nbWD+vZ8QYvgkA5My0gCEilXoTPCywoupezyWSz1G5bruB5HoLkmwiLYtIjbSlS5Nsv4PLDrze9iAq99X4a392sONTLKNb8TiVU5ThmyQZ0S97bCIchqHoZh2EERp+GEcRpFC6nmPp9zmc0TnOPWYtdk2A5picdxvHjJEQ4uBIeg9-Yej-EYnZBVBrs7GnXtV6ZymqfnuFF9pJf6RPnMZ9P5l1wt3SN+xLf2Fx9g8X2Mx+MOtJNk5QHaoGKdjVbfDyVzyN5+pmnF7ppdj6Qd9GTwJlPxZWatYg4Nk1HqEgepe5LHxofIGfZgJ62BAydsrIewD1vslTq99qLZzQrPV+C8dJ6TLj-eC1dcG8E3sHJa4DIGNScBqFkIZTB-iBnoYc8wwi6ibDSNko8QqkBOmLJMvMywC30kI++0sppyxmgrYBSsXxFSKhAwMTlnCBn+CwviPFT76icMg-0+9wgqhTpI3+jA7Z9UdoNZ2EiKCWwsdIv2AdcogKUbSEwCdXJWG8VovsYJWJ0hBL8OwcxSqdjMQ4j2WdaK5zUgXN+i8P72McbachcSqENl1L3aYPCXCrBcLqew-1-DvgMQOIxuo7CQQ2F-Eg5j0nrxUi-RJhCl5l0abDABWSlGTh9HMOYTYuK9wcgExq1JVgD2ZGAwMNgU7ImSsI6KqYxEJXqYsrBTjfb3ikL0myocPw-Qjr+PiXEAjU3+PvLh+9-C1KNBsmgKJhFrntv1J2w0XYCJIJssWzjdn7MWoctWv1TnjG1P3aYlIir-ATnqf4CynlLPvhknO+C2laSIZ-b5vyUWxNrkAp8W8KTgT1rtYGwTOzhC2hcriPw6TAVuU5RFzyUXNPRfPTFHTHmsosY-MygD5FEuoTvZurdD7tx8LYHWesyaRFVH6EEKdeT8iFMI1pnL37EPqSqgUgoxaAu6PvU+GpiaGB-FxIwfZ-Qmr2rMRqnZgTJ0hPgBQEA4BaDIoHRRNkAC0FM+K+q8oMkNob5im34W1bk3rcY2X7n+cCgQnAMKsLqdWVKU7SVtDG+u3QbXTHxsyVU4Tzl-msFMEM-d8azFgZDSNUlDJkPxWhHNxL+zWHYQY-Jh9mz-Gqmc427C7AggYcmgMSdM2Nsivy5SrbqEDkpBAoC-cmwRGbBqP8uovIDgDH6f0xge4YJShY3gc7skskCBEZNzlDAFITltGVjhGrFOckCBOUTTqYzhpda6t17pnpfOqYcvkAwRACNC-6lUzCuQYQPC+zZ0H1rdhbD2ldT1uJ9YtClw5gQagDPjZNPw+wai8kgoZEQip2D4XU75K9JaopbRh2Ni0F2duXWCHt67+3KjKYUlUBTRwFJTnRteACAM2VY0u7ta6+3wKAhAwdFgJBDPAhGmjbVSHTuaeJxaNI6TU1CMDMcLJD7aPBVR6Y7FgIGx4pSI9Wym010Y4rZjTxaSBDpPx4z3EzM+D7dSEMQNfAzBBLqD9YsdPdH-C2Jy5gGHLUZb5iYjhqbnPVs5RkzZqMPO+V0zGzb0MudzSS1iQxLDAVBFSq1OiW561pL8ICsxaQ0nC2ysTTHiv9nMKV8lFXe6hICZEVstJ5g6gpUUllyKLGRcQP6QIA9HXKasO2MENV2x5OAjrVkwJDAj3U-mXFfKCszf7J41RPiNF0qS3Sn0T6AyNRCNCybDnukCpO5JrtK7OOybOZVIcFhB7FIMcbewyq+R6oix1ttLcvKKiBNKnWoJWTWqpjMKroQe7KenLEIAA */
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
          onDone: "MAKING_VIDEOS_SUCCESS",
          onError: "MAKING_VIDEOS_FAILED",
        },
      },
      MAKING_VIDEOS_SUCCESS: {
        entry: assign({
          makeVideoOutput: (data: any) => data.event.output,
          errorMessage: null,
        }),
        after: {
          10: "IDLE",
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
