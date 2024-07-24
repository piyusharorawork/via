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
    /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgEkARAGQFEBiKgeQEEKB9ANUpsYGU2ACswDiNANoAGALqJQABwD2sXABdcC-LJAAPRACYALAGYSAVgDsp00fMA2UxKMSAjAE5TAGhABPRM+f2JBJ6ABzOIQZWBgYBegC+cV5oWHiEpJS0dADCVGRZANJsAHI0AOqc3IxsAEIAqgAq9YxFkjJIIIrKahpaugiGJhZWNvaOLu5evggheuZmriHWesHmEi7xiSDJOATE5NT0OXmFXBQ8bABKjKWtWp2q6prtfQNmltZ2Dk5unj6IBnpnCRnMtViEbHojDYjAkkhgdml9pkjgU2GdaPUaBUzoxbu17t0nqAXsY3sNPmMfpN9AZbGYDO41uY9O5weZYVt4ak9hl6LwaMwLlkABLYnh4+RKB49Z40wbvEZfca-KauQwkQGmWzgvSmVxrZymDnbbmkUSNMhFYRivh0CAaMAkAgANwUAGtHSbdmaaBarTbeAgXQpMOhCa0JR0pYTevpnBJXEFVnplrZdWtotTphJTCRzMYcxICwZk8aud6SOb6pbraceLw6GAAE5NhRNkhyAA2YYAZm3UCQvYiqzWA0H8K7Q+HpJGCY9Y-144mJMnU+miwYs5YQiRXEYIhm9yEIkbNkO9qx2HWqgAxRgXACybEYAhoJQo2VyqMvNtn0fnsrTEYBhJsEgJquYziQXoW6LCQIS2HYRjxrMzgMrYZYpBWP7Xmwd6Ps+r7vp+fBYjhlR4feD5-l0AHEvothApEyEGOCYRpvmm5-Ag5i8XmCFjOYyGmAhGFnuWiJMKwo64Wc9TMGQVANvahBOhO7qehJexSRQMkUXJClKeOk5ho8EbSHc-4yvRQEgSuYFuKh0FZoxehJvqLFGK4IKuOy4lYZJLC6f6sm+oZDbNq27Zdr2-aDlppA6XpOJomFimBsGU5mTOFn4lZRI6Ig4J2aujmQc53EGBIO5VSEawJlBwSuK4BiYQieyhfJ6VsLwtRZFkNC8A22iwCoYaOugPYqM2yDxkQdDnqQnXhT1fUDUNNHSgVfT6nM1g2CCUGmLqMwuSJ8Hgtqzg2BYhqtf57VLfpaVKXhhk0B+I1jdNJCTdNTazRI82LSQy3dTe70UJtMaAbtZhQtBR0nTB3FGIxJC2I4RgOAsG4Am1pqVr61YhZU-AQ4pH10F942-VNM1zQtCVE36tZk29lNQ7lkq0dZhWLsdGqYyyR0RJCWb6sCISrCJRgsnukRiXCAV7COpM4vwvX9YNw2jbTf0M0DTMqz6rMBqt2sbdzUa89tcaC3owveduAJGFmIIIbu+5o9VYQfErnImyQl7JTwdoOmproevFQch+rPDGSGpkaOZbQ81tC4e7mcsuPmx22MhaNbkJwKmAyMy+fmMwE9hFDBWzOKNi2bYdt2Kh9k2A4g3HDcJ5lyf4Knlm25noTZ8sUGRI7he2FmCG5iuh2HZX4Q14iPc2hb62699E30wDjPd3XodVFr2-Q3R-NQWqJDRLqIlj+Y0sqogvEmHdCwsrxrEbMrj3B8feOt5IbUz1j9A2B8jZH3rpvCmtAuZpxthnQCaFIS3wfrSVwtg9wsndkWOkIIRJ6hEq5OWa89jol9CfcOqlgzRxBpQkmvdGCJyyinHKiC5x8z6MVUCKYypQRBFmSEJhLqLEduYZqARHDkNIIw6hkUW4xXbnFBhNAMQn1YQPIeeUR6AV4fZfhEFBEoymJg2+wQZhoRapEIssiSDyKAVvHWoDd503+oDYGzNHHMOcVbTh+VM5lx3DMWYYQsFQkcOYYRUJ4Jo3EYhKRmMYQPUJj42BICabgP3p442-90m4TgR9C+3DEBw32ojSwyMsxalzLMYwftghl3un-Qm-JBQimoVkveHjD7M3aUKYUJ8Sl2wQPuRMzJro5hTEWB+L9ph8RiPGKEctDCGj8psfACgIBwC0ItYeyCbIAFpZ7cROfY3kByYY2QBHg3M2DmQ4KEgCAILTA7-zVsw3gVzL59DcFBeC9knm+TTPMquFjLCYwZOXXU9jyIpXwk+F8b4Po-NKQgY6cwYgpiqlXPcBdYJ0iatVFcx4AiSPsUlJxBl0potGVYJiKZbDRBElgos0TUa+XgrxQEhpsG6hTH5VpFYwavTPjrOlmdHBuRCJ-Xi4QSxoTdtxTGEg8xoUWGECQ2oWopOFYiUV5NIaSpQdK+CcrIIREgsYLM2M3JCWdnYH+vtTz6tVsTE+RrOYmpsoKuYaZWJajsE-SRc8gSrP1EeTFSF7GfPNuKoaPr+Z+oxoYRYiFELS1cFuFqJAbCytmPmPceo9XvMJhva8Sa-nasTI7fwtjghplMa-NMqaYhQuloxFccLAG+ITd83Rhyr7BPgoK8JBcnA2C3KxCFWoiwtU-gHaBJ8ObwKrX4EdoSn5uAnVEue1g8z2WGFgoNzh7EFMqOujFdgNRVRYpI-cthsHCLQU4ZJ4wMy0l-mWisF6Ur9qvVnPNE887T2uqcqYyxlyytxdqESOYn7nvUVQpxRSKCAbNbKmY8qrVKqzJEHcjgELMjLr5BWpaQYDM6UAq9phDRBE1auKRtzuIIR3GXODzV9ThBzAkBIQA */
    context: {
      videos: [], //  filtered and displayed in a table
      originalVideos: [], // Synced from backend
      videoDetails: null, // single video with more info to show
      errorMessage: null, // any error message when something went wrong
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
