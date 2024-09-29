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
        fpsInt: number; // TODO fix it at the source
        progress: number;
        exportedVideoURL: string;
      },
      events: {} as  // All the events invoked by user
        | { type: "GENERATE_REEL"; input: GenerateReelInput }
        | { type: "CLOSE_VIDEO_EDITOR_MODAL" }
        | { type: "EXPORT_REEL" }
        | { type: "UPDATE_PROGRESS"; amount: number } // TODO this can be moved inside the machine as an internal event
        | { type: "EXPORT_FINISH"; videoURL: string }
        | { type: "CANCEL_EXPORT" }
        | { type: "CLOSE_VIDEO_PREVIEW_MODAL" },
    },
    actors: {
      // All the async services
      generateReel: fromPromise<GenerateReelOutput, GenerateReelInput>(
        async ({ input }) => {
          const res = await trpc.generateVideo.query(input);
          return res;
        }
      ),
    },
    actions: {
      saveGenerateReelOutput: assign({
        generateReelOutput: (data: any) => data.event.output,
        errorMessage: null,
      }),
      resetGenerateReelOutput: assign({ generateReelOutput: null }),
      saveError: assign({ errorMessage: (data: any) => data.event.error }),
      saveFpsInt: assign({
        fpsInt: (data: any) => {
          return eval(data.context.generateReelOutput.fps);
        },
      }),
      updateProgress: assign({
        progress: ({ event }) => {
          return event.type === "UPDATE_PROGRESS" ? event.amount : 0;
        },
      }),
      saveExportedURL: assign({
        exportedVideoURL: ({ event }) => {
          return event.type === "EXPORT_FINISH" ? event.videoURL : "";
        },
      }),
    },
  }).createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgEkARAGQFEBiAcRoDkaAlAQQBUaB9NmjSoBtAAwBdRKAAOAe1i4ALrln4pIAB6IATAFZdJAJwA2bcYDsARkuHDV3ZYA0IAJ47tAZhJm9d0R90AFgAOEO0AX3DnNCw8QlImVk4uMmYGfkEqOghVMBICADdZAGs8mJwCYhJE9m5U9IEhBELZTHRlVTFxLvU5BQ61JE1EcwcSD3NA20Ng4MsHQPNnNwRtf29g40XzD2NRW0tAyOiMCvjqllqUtIyhOjAAJwfZB5JpABt2gDMX1BJyuJVGrJeq3KjNfBFNoDLo9IZ9JQqQagLQIUaWcaTaazeaHJauRDzcwkfyiYITSwecm6DyiI5REAAyqkABqlBoAHleDQKGQuBy2LwALIcigcKi8DkABUuFDoNAAGlKBVwwXCZPJEap1KjZsYSItjCYyVNAjZ8StJsESOTDGtdHTAmtAvSTrFmSQ2RROdzefzBSKxRLpbK6ABhKgcgDKfClAjZNAA6sLReL1SAEQMdYhgutzbNDB4qbSPMtEB5Al4i8YJtpK+YzLtjMdGadAaRFcq2NcGplwxxmGGhNylSr05mkdnVvojKYLNZbPYnASEA7rYtRNpzHM6eY9qEW0zzp2VaDGlkAKpSsU8XhxjkMARRqPjzVZoaop1lhBbDFkuweJYnh7Hoh5th6J7dmefaQaqABiqRkFGAASr79JOH46DOJhmFYNh2Li36mNaVgeLYog2MEQSGGB7rnMCdQ3OevBwRwZC0HKGiwIo7R5OgXyKI8yCWKIRB0EeQKXCCTGZCxbEcWhWrIsMCB2vqgTGJY24OOSwRrBaOYYpYczBOY+y6FY2iUrRZxVF6PpxjQCbJoG4qSjKrByhG0Z8PZXKOc5KZBop74oiMYwTFMtg4gsBk-toJGUuRlHUZEDL4LIEBwOoElEL0b4YWFCAALTGN+pUkqIVXVTVVVbDZ7bkNQND5eh2qYQghyGCQNazFaxYmXFAT6iJ-gFvsw26A1HoMT2YKtUpU4OiNZKiJMZKHFp2jfvhNr7EaInGKEgSiFNDK5Z67JcjyfICkFbkhp5C2hSph0YmYxgOlMe65hW35ruMDjbmSujGMRdbTceo5QTJQjPYVKljHuoMJZ9e50rM37reMIRUVpUxaeY5iQ5JSSMb2w6sexPLw+1RVvd4YNfXYR3+IEO3GSQDbWLoaxrXuzok6yV13vGZBJvdwYeTT8IFXTKkuvqsyiDWujBCzmxxcRJC6IY1HaHrdKWDWaXhEAA */
    context: {
      errorMessage: null, // any error message when something went wrong
      generateReelOutput: null,
      fpsInt: 0,
      progress: 0,
      exportedVideoURL: "",
    },
    initial: "IDLE",
    states: {
      IDLE: {
        on: {
          GENERATE_REEL: "GENERATING_REEL",
        },
      },
      GENERATING_REEL: {
        invoke: {
          src: "generateReel",
          input: (data: any) => data.event.input,
          onDone: {
            target: "VIDEO_EDITOR_MODAL_OPENED",
            actions: ["saveGenerateReelOutput", "saveFpsInt"],
          },
          onError: "GENERATING_REEL_FAILED",
        },
      },

      VIDEO_EDITOR_MODAL_OPENED: {
        on: {
          EXPORT_REEL: {
            target: "EXPORTING_REEL",
          },
          CLOSE_VIDEO_EDITOR_MODAL: {
            actions: "resetGenerateReelOutput",
            target: "IDLE",
          },
          //   EXPORT_FINISH: {
          //     target: "VIDEO_PREVIEW_MODAL_OPENED",
          //     actions: "saveExportedURL",
          //   },
        },
      },
      EXPORTING_REEL: {
        on: {
          CANCEL_EXPORT: {
            target: "VIDEO_EDITOR_MODAL_OPENED",
          },
          UPDATE_PROGRESS: {
            actions: "updateProgress",
          },
          EXPORT_FINISH: {
            target: "VIDEO_PREVIEW_MODAL_OPENED",
            actions: "saveExportedURL",
          },
        },
      },
      GENERATING_REEL_FAILED: {
        entry: "saveError",
        after: {
          10: "IDLE",
        },
      },
      VIDEO_PREVIEW_MODAL_OPENED: {
        on: {
          CLOSE_VIDEO_PREVIEW_MODAL: {
            target: "VIDEO_EDITOR_MODAL_OPENED",
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
