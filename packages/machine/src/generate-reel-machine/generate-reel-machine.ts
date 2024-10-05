import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { GenerateReelInput, GenerateReelOutput } from "@via/core/video-manager";
import { AppRouter } from "@via/server/app-router";
import { assign, createActor, fromPromise, setup } from "xstate";

export const getGenerateReelMachine = (fetch: any) => {
  const trpc = createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: "http://localhost:4000/trpc",
        fetch,
      }),
    ],
  });

  const generateReelMachine = setup({
    types: {
      context: {} as {
        errorMessage: string | null;
        generateReelOutput: GenerateReelOutput | null;
        progress: number;
        exportedVideoURL: string;
        videoDescription: string;
        quote: string;
      },
      events: {} as  // All the events invoked by user
        | { type: "UPDATE_VIDEO_DESCRIPTION"; videoDescription: string }
        | { type: "UPDATE_QUOTE"; quote: string }
        | { type: "GENERATE_REEL" }
        | { type: "CLOSE_EDITOR" }
        | { type: "EXPORT_REEL" }
        | { type: "UPDATE_PROGRESS"; amount: number } // TODO this can be moved inside the machine as an internal event
        | { type: "EXPORT_FINISHED"; videoURL: string }
        | { type: "CANCEL_EXPORT" }
        | { type: "CLOSE_PREVIEW" },
    },
    actors: {
      generateReel: fromPromise<GenerateReelOutput, GenerateReelInput>(
        async ({ input }) => {
          const res = await trpc.generateVideo.query(input);
          return res;
        }
      ),
    },
    guards: {
      canGenerateReel: ({ context }) => {
        return context.videoDescription.length > 0 && context.quote.length > 0;
      },
    },
    actions: {
      saveGenerateReelOutput: assign({
        generateReelOutput: (data: any) => data.event.output,
        errorMessage: null,
      }),
      resetGenerateReelOutput: assign({ generateReelOutput: null }),
      saveError: assign({
        errorMessage: (data: any) => data.event.error.message,
      }),
      updateProgress: assign({
        progress: ({ event }) => {
          return event.type === "UPDATE_PROGRESS" ? event.amount : 0;
        },
      }),
      saveExportedURL: assign({
        exportedVideoURL: ({ event }) => {
          return event.type === "EXPORT_FINISHED" ? event.videoURL : "";
        },
      }),
      resetProgress: assign({
        progress: 0,
      }),
      updateVideoDescription: assign({
        videoDescription: ({ event }) =>
          event.type === "UPDATE_VIDEO_DESCRIPTION"
            ? event.videoDescription
            : "",
      }),
      updateQuote: assign({
        quote: ({ event }) =>
          event.type === "UPDATE_QUOTE" ? event.quote : "",
      }),
      resetExportedURL: assign({
        exportedVideoURL: "",
      }),
    },
  }).createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgEkARAGQFEBiAcRoDkaAlAQQBUaB9NmjSoBtAAwBdRKAAOAe1i4ALrln4pIAB6IATAFZdJAJwA2bcYDsARkuHDV3ZYA0IAJ47tAZhJm9d0R90AFgAOEO0AX3DnNCw8QlImVk4uMmYGfkEqOghVMBICADdZAGs8mJwCYhJE9m5U9IEhBELZTHRlVTFxLvU5BQ61JE1EcwcSD3NA20Ng4MsHQPNnNwRtf29g40XzD2NRW0tAyOiMCvjqllqUtIyhOjAAJwfZB5JpABt2gDMX1BJyuJVGrJeq3KjNfBFNoDLo9IZ9JQqQagLQIUaWcaTaazeaHJauRDzcwkfyiYITSwecm6DyiI5REAAyqkABqlBoAHleDQKGQuBy2LwALIcigcKi8DkABUuFDoNAAGlKBVwwXCZPJEap1KjZsYSItjCYyVNAjZ8StJsESOTDGtdHTAmtAvSTrFmSQ2RROdzefzBSKxRLpbK6ABhKgcgDKfClAjZNAA6sLReL1SAEQMdYhgutzbNDB4qbSPMtEB5Al4i8YJtpK+YzLtjMdGadAaRFcq2NcGplwxxmGGhNylSr05mkdnVvojKYLNZbPYnASEA7rYtRNpzHM6eY9qEW0zzp2VaDGlkAKpSsU8XhxjkMARRqPjzVZoaop1lhBbDFkuweJYnh7Hoh5th6J7dmefaQaqABiqRkFGAASr79JOH46DOJhmFYNh2Li36mNaVgeLYog2MEQSGGB7rnMCdQ3OevBwRwZC0HKGiwIo7R5OgXyKI8yCWKIRB0EeQKXCCTGZCxbEcWhWrIsMCB2vqgTGJY24OOSwRrBaOYYpYczBOY+y6FY2iUrRZxVF6PpxjQCbJoG4qSjKrByhG0Z8PZXKOc5KZBop74oiMYwTFMtg4gsBk-toJGUuRlHUZEDL4LIEBwOoElEL0b4YWFCAALTGN+pUkqIVXVTVVVbDZ7bkNQND5eh2qYQghyGCQNazFaxYmXFAT6iJ-gFvsw26A1HoMT2YKtUpU4OiNZKiJMZKHFp2jfvhNr7EaInGKEgSiFNDK5Z67JcjyfICkFbkhp5C2hSph0YmYxgOlMe65hW35ruMDjbmSujGMRdbTceo5QTJQjPYVKljHuoMJZ9e50rM37reMIRUVpUxaeY5iQ5JSSMb2w6sexPLw+1RVvd4YNfXYR3+IEO3GSQDbWLoaxrXuzok6yV13vGZBJvdwYeTT8IFXTKkuvqsyiDWujBCzmxxcRJC6IY1HaHrdKWDWaXhEAA */
    context: {
      videoDescription: "",
      quote: "",
      errorMessage: null, // any error message when something went wrong
      generateReelOutput: null,
      progress: 0,
      exportedVideoURL: "",
    },
    initial: "GenerateFormView",
    states: {
      GenerateFormView: {
        initial: "form",
        id: "generateFormView",
        states: {
          form: {
            on: {
              UPDATE_VIDEO_DESCRIPTION: { actions: "updateVideoDescription" },
              UPDATE_QUOTE: { actions: "updateQuote" },
              GENERATE_REEL: {
                target: "generatingReel",
                guard: "canGenerateReel",
              },
            },
          },

          generatingReel: {
            invoke: {
              src: "generateReel",
              input: ({ context }) => ({
                prompt: context.videoDescription,
                quote: context.quote,
              }),
              onDone: {
                target: "#VideoEditingView",
                actions: "saveGenerateReelOutput",
              },
              onError: {
                target: "form",
                actions: "saveError",
              },
            },
          },
        },
      },
      VideoEditingView: {
        id: "VideoEditingView",
        initial: "idle",
        states: {
          idle: {
            on: {
              CLOSE_EDITOR: {
                target: "#generateFormView",
                actions: "resetGenerateReelOutput",
              },
              EXPORT_REEL: "#ExportReelView",
            },
          },
        },
      },
      ExportReelView: {
        id: "ExportReelView",
        initial: "idle",
        states: {
          idle: {
            entry: ["resetExportedURL"],
            on: {
              UPDATE_PROGRESS: { actions: "updateProgress" },
              EXPORT_FINISHED: {
                target: "#VideoDownloadView",
                actions: "saveExportedURL",
              },
              CANCEL_EXPORT: {
                target: "#VideoEditingView",
                actions: "resetProgress",
              },
            },
          },
        },
      },
      VideoDownloadView: {
        id: "VideoDownloadView",
        initial: "idle",
        states: {
          idle: {
            on: {
              CLOSE_PREVIEW: {
                target: "#VideoEditingView",
                actions: ["resetExportedURL"],
              },
            },
          },
        },
      },
    },
  });

  return generateReelMachine;
};

export const getGenerateReelActor = (fetch: any) => {
  const videoManagementMachine = getGenerateReelMachine(fetch);
  const actor = createActor(videoManagementMachine);
  return actor;
};
