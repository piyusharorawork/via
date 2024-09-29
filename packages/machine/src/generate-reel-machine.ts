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
      },
      events: {} as  // All the events invoked by user
        | { type: "GENERATE_REEL"; input: GenerateReelInput }
        | { type: "CLOSE_PREVIEW_MODAL" }
        | { type: "EXPORT_REEL" }
        | { type: "CANCEL_EXPORT" },
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
    },
  }).createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgEkARAGQFEBiAcRoDkaAlAQQBUaB9NmjSoBtAAwBdRKAAOAe1i4ALrln4pIAB6IAjABYAzCQCsRgBzaA7ACZduiwDYb2gDQgAnohsWSV+7YtG2gCcRvq6og4AvpGuaFh4hKRMrJxcZMwM-IJUdBCqYCQEAG6yANYFcTgExCTJ7NzpmQJCCMWymOjKqmLiPepyCl1qSJqIRuEkQVb6Zqa2c0H2+q4eCFbaViSifhb62vampkH6VtGxGFWJtSz1aRlZQnRgAE7Pss8k0gA2nQBm76gSJUEjU6qlGg8qK18CUOkMen0RgMlCphqAtAhxqJJtNZvNdItlu5EPpRIYTkFggFjqYLASziBgdVSAA1Sg0ADyvAACgI2TQAOq8Dncm4UOg0AAa3I5bC4kMRMnkKNU6gx2lEwRIdn0R202jMulMoiCKx0Jm1+nsuymgQsQQsFgZTKubIonJ5fLIguFotY4oAwlQOQBlPi8mj8gWKkDIoZqsYTKYzQ74wlmhDmEjacyLCwmvT2mzOi4g0hSmVyyG8ACyHIoHCovrFdADHGYAaEvArsq4MbjqITCA1Wp1eoNc2NpuJw+22dMS1JB1M+hm+idMUZpeZ1xSDXuzSbADEOGRaOKNLBFJ0CuhfooXsgNUQ6C7QTdwQfsrwT2eaBR+2VeMRgxPxNkOAIrCsIJRDsfMiVWfRKRIMJRFgqx7SMDDdCMaJN3wWQIDgdQ3yIfogMHEDEAAWnsDNaJLeId0oWhyMGSj0UQXQrAzfVDBzRYIKMEIYM1RjLnfPc7iabI2JVNFRgQE5vEdMkphCGYrFgjMoMMcwDTCB00PsexQnEssSDdD0IyjZt-Tk4DOIQBwghIR19SOdcF243j9RIPwYI82wrRXXDN1IkgeyrQ9a3rRs7P-ByOMUjYNRQykjgiBcwmsXzdGzAkIlXIx7BNCw5nMncwX3GSu1-c8ktVKjnOtfypnWLD9j0dYdOQ3ZTAw4SoKnAI8MiIA */
    context: {
      errorMessage: null, // any error message when something went wrong
      generateReelOutput: null,
      fpsInt: 0,
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
            target: "VIDEO_PREVIEW_OPENED",
            actions: ["saveGenerateReelOutput", "saveFpsInt"],
          },
          onError: "GENERATING_REEL_FAILED",
        },
      },

      VIDEO_PREVIEW_OPENED: {
        on: {
          EXPORT_REEL: {
            target: "EXPORT_REEL_MODAL_OPENED",
          },
          CLOSE_PREVIEW: {
            actions: "resetGenerateReelOutput",
            target: "IDLE",
          },
        },
      },
      EXPORT_REEL_MODAL_OPENED: {
        on: {
          CANCEL_EXPORT: {
            target: "VIDEO_PREVIEW_OPENED",
          },
        },
      },
      GENERATING_REEL_FAILED: {
        entry: "saveError",
        after: {
          10: "IDLE",
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
