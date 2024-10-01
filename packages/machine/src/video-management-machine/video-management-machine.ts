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
      },
      events: {} as  // All the events invoked by user
        | { type: "LOAD_VIDEOS_PAGE" }
        | { type: "CLICK_NEW_VIDEO_BUTTON" }
        | { type: "CLOSE_ADD_VIDEO_FORM" }
        | { type: "CLICK_ADD_VIDEO"; input: AddVideoInput }
        | { type: "CLICK_VIDEO_ROW"; input: ViewVideoInput }
        | { type: "CLICK_DELETE_VIDEO"; input: ViewVideoInput }
        | { type: "SEARCH_VIDEO"; keyword: string },
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
    },
    actions: {
      saveVideoDetails: assign({
        videoDetails: (data: any) => data.event.output,
        errorMessage: null,
      }),
      saveError: assign({
        errorMessage: (data: any) => data.event.error.message,
      }),
      saveVideos: assign({
        videos: (data: any) => data.event.output,
        originalVideos: (data: any) => data.event.output,
        errorMessage: null,
      }),
      resetVideoDetails: assign({
        errorMessage: null,
        videoDetails: null,
      }),
      removeVideo: assign({
        videos: ({ context }) => {
          return context.videos.filter(
            (video) => video.uuid !== context.videoDetails!.videoUUID
          );
        },
        originalVideos: ({ context }) => {
          return context.originalVideos.filter(
            (video) => video.uuid !== context.videoDetails!.videoUUID
          );
        },
      }),

      // client side filtering
      updateVideosMatchingFilter: assign({
        videos: ({ context, event }) => {
          const e = event as { keyword: string };
          const videos = context.originalVideos?.filter((video) => {
            return (
              video.name.includes(e.keyword) ||
              video.description.toLowerCase().includes(e.keyword.toLowerCase())
            );
          });
          return videos;
        },
      }),
    },
  }).createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgEkARAGQFEBiKgeQEEKB9ANUpsYGU2ACswDiNANoAGALqJQABwD2sXABdcC-LJAAPRACYA7AGYSAVgOnTARgN6AHEYAsRvQDZTAGhABPRFbt6EiR2xnqBNi4BAL5RXmhYeISklLR0AMJUZGkA0mwAcjQA6pzcjGwAQgCqACrVjHmSMkggispqGlq6CIYm5pY29k4u7l6+CEaudiQAnI4SEsYGjgZ2pnoxcRg4BMTk1PQZWblcFDxsAEqMhY1ararqms1dPWYW1rYOzm6ePohLU8snNN5hIjFYnOtYiB4tskntUoccmxTrRqjQSqdGDdmnd2o9QM9jK9+h8ht9Rn5+iRHOZ5uZIu5XBtoVtErsUvReDRmOc0gAJDE8bHyJT3DpPfREvrvQZfEa-BCMszmPRGNaq1zgqzMmFs5L7OiiArnZhowVY6S3UV4zqS3pvAafYY-MZWKwSUzBCR6YFWaamNXuSGbBI7UgAWWY2TIeWE5roEA0YBIBAAbgoANbJ3VhkiR6Ox80INMKTDoPGNYUta0PW0IOyORwkBbet7+iQOaYUhDupYkAz+VzA+Z6OU61m5-MxuMnHh0MAAJwXCgXJDkABtywAzFeoEg5uFTwuzxjF-DpssV6RV3G1iX1xvNgytyztzvdt16KxmVVGJY0gxXGWJkoQPXZzhoPJTnOc02HDRgKGYKh0iYLkLkg6C4IQpCbxrcUCUQBsmxbQxX1MDsjC7BU7EmakJH8aYwWBPRTFmcdQ0PKNp3NfgADFmDIWgKDobRYBUctk3QLcVEXZB3SIOgwIjLjj1KPiBKE3C2jvAiEH9aYSCGVxbDlOxpio11RwM-0gyHeZHDsCQQJDWFdlEWpuJPXgEyTFNz0zbMJzhdzqk8tSzwvcsHkrS0cTw-EdH0GwghCcyDGfQD6VcD8AybUwzKMEIHIhEJ2Nc0gQrCzFvMXZdVw3bdd33IK3JoDzVOqiLSyijQYqaEVtPwxLumS4IDDSjL3GMbKFSsRwfRIexpjM6xZj-KxnJZDjdlYdgTzYXjGHOcM2EYARIJoYTEVyXbzS0sUEq6IinxfVjyPfBUJhMNUG0A6YrDWBwnLKvUSFu-bDuO07zoKK7UPRcHSgOo7w3um17x9b8aTBObjJ+gcXUQJiSCsUjpmMnoPQMEHcyYVgqrOU5qg07zE0IPz0yzZrttIOmKAZsomZZrrL2i69YoGh662eki23eyjuwHAxDLM+xNT9AIjBpuE+YF5E2pZ+clxXNdNxUHcFz3JSSF1jrGYNwTeBFnr8D6q1BsewjH1lsiKIsv4gJJxjpmfPpQUA7Xdn2oXHbYXhKjSNIaF4bzRPEmSSCkmSFzkiQFOt6OHaofh48T5PeDRnThv0wznAp0zzO7RxgWCcjAlWOZxrdSPSEL5nY-4wTLpEsSJMz6TZPkxSWt7pGY+Lg6NMuyuhq6GujJM4YzP9vTXBMKanP9Adlu1UCZ5ISq7b4Reh+EtOx6zye8+nnmL7a0Kr-U2+V897ov2I584JjKzGBDNMYdhvwuExvNMyEhHB72pmfV+l8ZxqTjgnJOKcR7p0khPHOU9rYoJ4ugsuKcf51jCHNF6QDxrNych+P8rh+yqnom4QCQElg9zBhQfmV8fLsxLFza2u0BbOyvFIch95wTLBJkYb09FXBuH+g4bsf4DILBWv8AcNFlhcJEXw2qJsGrmyasInhoiSyi16uLfq1YPZ1mkcrcE8iNpKP8EYbs9gnGKKWEBCimp-R6PMVfEhmDU6jwzo-fBz8zG8NQZiUJ5dJG6X8KYJsLEWIh3IsseBqjxpPk0Q5bRHCglxNgoPIS2CH54Nzvnc++j4lnAqcvCWdipZSIcp6NwEClgAycD4zx8xFoZLSc3cmy1HBcJRG1AW-DkyCMCq-aZH9GmnksS7N2cV7H3hls+Uib0-Y5UCIZWw40-w9KME4KZNBUSzMMfVM2Fsrbn2WRY-yVjXY2Pdu03SuzXpvgVrNUwxkSbpWWJrIcDlrm3JCaXMJVTIk1IIS8m5MzYUYKSa028q8-CaiCHvWUZlFHmCOUEP8hhGIrAiFcpB5USCvJCc0u+ETcHZ1qS-OlDLVk300li+KdZ15103t0xus0hyejxXvJy40qVa1paDLkPJ+SzPvoitlyLX6Kt5HyAWyThqOD9Mw8EThzBnPMmAxArgJAGQsCxcigFOwNhiFCfACgIBwC0Epb56NdIAFoLUIH9c2EEIbQ3TGDFtOlHJvVVy6PND8jlvyfl6U5GkjlNrWyPKsmNOLFTWpmD6dw4a7AlsAR+DsehlSzDdONf0JbJnytzBBKCNAYL7XgohKgObf7ulmP2CilybBpIbB42aoImH5XTdK9KTk7BcKzcQpl3aHHWqbM+Bwg6LAOWcB+QIBkXD5SyRYLd0wuFEK8suqRIcDKagHDSH0jllgfmbhKliao6HzTSYglyoNEYJMhidM6F0KCXt0pYZWBqwj-XSgDGwjhVF7zMH6cNzdDANn+hm8+ttuXz14KB4a+UsZhAHGCGdwId62C6T6LJQFgWzEw6-PuLNEkp3w10Xta6B2keHTuhUwDFr5UZONciIc5U-tzExgeS8QNbJ+cNDj-aN3ce3aOsY4aTDeiAnMUclHrBnvfgLL+Qk2P6CBNSfpDZJ2BGMAw-6JNWJ+lYp0uRp7G3BQM5-FjeHZM+uGqqZu5n4GWZLdZ1Tfhm5MLTRYCB+Vnxicjb+4J2afOxr8FqJ8pMWHzXMjvJwQQ3QRbtSsZw8DSl6zheXEzPY8UkAJZ8IlLEDCqLSYZME5h3TkTSZRb9CXcwNPKdJqrG13S1ciE4BrJKFRWWbC4Dr7h5qqgjdbLl5oqtWqYaOOBzc+nTR3gDewi1wTWHAyW0t0K0Xcoq6xlLubHGyJcYooc7jn3+lq2+tJwJP26Lc7sFbENBs3Z7auxTlzlMjo-PNmYjl5hHc65YLhWrlVXyq2kz0HZD2rFnSovjhrGJwKHP9TTjFnVRCAA */
    context: ({ input }) => {
      return {
        videos: [], //  filtered and displayed in a table
        originalVideos: [], // Synced from backend
        videoDetails: null, // single video with more info to show
        errorMessage: null, // any error message when something went wrong
      };
    },
    initial: "VideosPage",
    states: {
      VideosPage: {
        id: "VideosPage",
        initial: "idle",
        states: {
          idle: {
            on: {
              LOAD_VIDEOS_PAGE: "loadingVideosPage",
              CLICK_NEW_VIDEO_BUTTON: "#NewVideoFormOpened",
              SEARCH_VIDEO: "searchingVideos",
              CLICK_VIDEO_ROW: "loadingVideoDetails",
            },
          },
          loadingVideosPage: {
            invoke: {
              src: "listVideos",
              onDone: "loadingVideosPageSuccess",
              onError: "loadingVideosPageFailed",
            },
          },
          loadingVideosPageSuccess: {
            entry: "saveVideos",
            after: {
              10: "idle",
            },
          },
          loadingVideosPageFailed: {
            entry: "saveError",
            after: {
              10: "idle",
            },
          },
          searchingVideos: {
            entry: "updateVideosMatchingFilter",
            after: {
              10: "idle",
            },
          },
          loadingVideoDetails: {
            invoke: {
              src: "viewVideo",
              input: (data: any) => data.event.input,
              onDone: "loadingVideoDetailsSuccess",
              onError: "loadingVideoDetailsFailed",
            },
          },
          loadingVideoDetailsSuccess: {
            entry: "saveVideoDetails",
            after: {
              10: "#VideoSelected",
            },
          },
          loadingVideoDetailsFailed: {
            entry: "saveError",
            after: {
              10: "idle",
            },
          },
        },
      },
      NewVideoFormOpened: {
        id: "NewVideoFormOpened",
        initial: "idle",
        states: {
          idle: {
            on: {
              CLOSE_ADD_VIDEO_FORM: "#VideosPage",
              CLICK_ADD_VIDEO: "addingVideo",
            },
          },
          addingVideo: {
            invoke: {
              src: "addVideo",
              input: (data: any) => data.event.input,
              onDone: "addingVideoSuccess",
              onError: "addingVideoFailed",
            },
          },
          addingVideoSuccess: {
            entry: "resetVideoDetails",
            after: {
              10: "idle",
            },
          },
          addingVideoFailed: {
            entry: "saveError",
            after: {
              10: "idle",
            },
          },
        },
      },
      VideoSelected: {
        id: "VideoSelected",
        initial: "idle",
        states: {
          idle: {
            on: {
              CLICK_DELETE_VIDEO: "deletingVideo",
              CLICK_VIDEO_ROW: "#VideosPage.loadingVideoDetails",
              CLICK_NEW_VIDEO_BUTTON: "#NewVideoFormOpened",
              SEARCH_VIDEO: "#VideosPage.searchingVideos",
            },
          },
          deletingVideo: {
            invoke: {
              src: "deleteVideo",
              input: (data: any) => data.event.input,
              onDone: {
                target: "deletingVideoSuccess",
                actions: "removeVideo",
              },
              onError: "deletingVideoFailed",
            },
          },
          deletingVideoSuccess: {
            entry: "resetVideoDetails",
            after: {
              10: "#VideosPage",
            },
          },
          deletingVideoFailed: {
            entry: "saveError",
            after: {
              10: "idle",
            },
          },
        },
      },
    },
  });

  return videoManagementMachine;
};

export const getVideoManagementActor = (fetch: any) => {
  const videoManagementMachine = getVideoManagementMachine(fetch);
  const actor = createActor(videoManagementMachine, {
    input: { originalVideos: [], videos: [] },
  });
  return actor;
};
