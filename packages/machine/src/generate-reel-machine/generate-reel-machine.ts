import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { GenerateReelInput, GenerateReelOutput } from "@via/core/video-manager";
import { AppRouter } from "@via/server/app-router";
import { assign, createActor, fromPromise, setup } from "xstate";
import {
  ExportReelEvent,
  GenerateReelContext,
  GenerateReelFormEvent,
  VideoEditorEvent,
  VideoPreviewEvent,
} from "./generate-reel-machine.types.js";
import { defaultGenerateReelContext } from "./generate-reel.machine.constant.js";

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
      context: {} as GenerateReelContext,
      events: {} as  // All the events invoked by user
        | GenerateReelFormEvent
        | VideoEditorEvent
        | ExportReelEvent
        | VideoPreviewEvent,
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
          return event.type === "ExportReel:UpdateProgress" ? event.amount : 0;
        },
      }),
      saveExportedURL: assign({
        exportedVideoURL: ({ event }) => {
          return event.type === "ExportReel:Finished" ? event.videoURL : "";
        },
      }),
      resetProgress: assign({
        progress: 0,
      }),
      updateVideoDescription: assign({
        videoDescription: ({ event }) =>
          event.type === "Form:UpdateVideoDescription"
            ? event.videoDescription
            : "",
      }),
      updateQuote: assign({
        quote: ({ event }) =>
          event.type === "Form:UpdateQuote" ? event.quote : "",
      }),
      resetExportedURL: assign({
        exportedVideoURL: "",
      }),
      selectVideoElement: assign({
        selectedElement: ({ event }) => {
          return event.type === "VideoEditor:SelectElement"
            ? event.element
            : null;
        },
      }),
      updateVideoElement: assign({
        videoElements: ({ context, event }) => {
          // When event is not the select element
          if (event.type !== "VideoEditor:UpdateElement")
            return context.videoElements;

          return context.videoElements.map((element) => {
            if (
              element.type === event.element.type &&
              element.id === event.element.id
            )
              return event.element;

            return element;
          });
        },
      }),
      resetSelectedElement: assign({
        selectedElement: null,
      }),
      updateElementText: assign({
        videoElements: ({ context }) => {
          return context.videoElements.map((element) => {
            // TODO this needs more work
            if (element.type === "text") {
              element.textInfo.text = context.quote;
            }
            return element;
          });
        },
      }),
    },
  }).createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgHExCAndAFzADEB7K1ANVzAHcSAzF1AGJmrBAFUADhDpgOEMEwAicTFVwTauJvgDaABgC6iUBKaxcm7cZAAPRAE4A7ABoQATweOALCUcA2AEYnPQAmLxDQkPsAX2jXNCw8QlIKahkRdk4eflZhAXEpGQBFAFcmen0jJBBTc0t8azsEAIBmRxIvVvCAvwBWAA5HXoDw1w8Efv69El7Q-r8-cL6-EMdY+IwcAmJySjAaegyObj4BPNFU-ZkAJTAwABtK61qLLQbqpraQknt++z89L1fkF5i0xogAnp+t8QhFoV54SFeo5+usQAktsldmlDgJjjwYDiCFBbg9BBBtGASAQAG5MADWVIxSR2lwOjDxWRIhKumnwJLu9wQtKYmDob0qT2qL3qjQcvT8vi8LWhjihv0G4Oaei87X6vS8ut1v0cI1RcXRmxZKT27KOXJ5B2JpPugn2VBYJAk9zoOVQJGZ2xtOI5rHx3Nt4v5LuF+DpYvqksMzzMrysH0QvQiJD0Kp1ARRXmGCq19ns03sCuVky8APstbRgaxcgUAFEIK9+fjBC2mO2LCwEABhe5mMBSkyp2UZhArLUBEIBfo-FpZkItIu60ItRtWoMkXv9vlQbuHju0QetmymKi0Cc1KdvOUIReK+ytd+GvzBWF+LX9AISCXJcDUrYZ611XdEn3K8b1oF1u1glh4MFAppHoAAFD0oCoOBYHvGUnxnU1lxaFp10cd9BgVU151+Eg-H1IEEWRAICy8KDMR2JDbwQrJBB4lCHgQBgCFwWBsEgAjH3TUBPj0aZOhGY1tyCewtXIwDlXXYZOj+QJHB3C0m2469kL47gBLM3jUKHdB8EwB5pLqIi5MQOd3EQNV2j0QJ-mhRZ7BaAtOOtA9cHkJQmC4fBR3QCBTwihQsLAGksmHUdYHHZNpRk943JfQIV3sMJfJCBY9CCecyOXAs-lKhTKpWWILXwJh5HgaoTKIFMXNk2wIS1ABaRVGrG8aoV6UL9zZdJOW4Xq03ygaEC8dTPIQSiWhITTKpGU0WkYgJpqxWbcTDLk-UW6cCqCQC9DVSEDX1KZ1vGSFvBzRdIXmd9vpO1lI3OzITkdKMBQea7XJWtVlyBMrFjW3oWlzecdV6DpJvCfSogGAHSDPTsTyyKH+qaNjy18SZK0XQ1IQRNHGKVKI-EcMIwmhIyNmgrFBIsrhSeWpphhmACAizFowPIpwtSidoIMMsjfJRhV8fCyLFGi2KmHi-FBefZFqoBGZFko8qzf+IzYiAA */
    context: defaultGenerateReelContext,
    initial: "GenerateFormView",
    states: {
      GenerateFormView: {
        initial: "form",
        id: "generateFormView",
        states: {
          form: {
            on: {
              "Form:UpdateVideoDescription": {
                actions: "updateVideoDescription",
              },
              "Form:UpdateQuote": { actions: "updateQuote" },
              "Form:GenerateReel": {
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
                actions: ["saveGenerateReelOutput", "updateElementText"],
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
        on: {
          "VideoEditor:Close": {
            target: "#generateFormView",
            actions: "resetGenerateReelOutput",
          },
          "VideoEditor:Export": { target: "#ExportReelView" },
          "VideoEditor:SelectElement": { actions: "selectVideoElement" },
          "VideoEditor:UnselectAll": { actions: "resetSelectedElement" },
          "VideoEditor:UpdateElement": { actions: "updateVideoElement" },
        },
      },
      ExportReelView: {
        id: "ExportReelView",
        entry: ["resetExportedURL"],
        on: {
          "ExportReel:UpdateProgress": { actions: "updateProgress" },
          "ExportReel:Finished": {
            target: "#VideoDownloadView",
            actions: "saveExportedURL",
          },
          "ExportReel:Cancel": {
            target: "#VideoEditingView",
            actions: "resetProgress",
          },
        },
      },
      VideoDownloadView: {
        id: "VideoDownloadView",
        on: {
          "VideoPreview:Close": {
            target: "#VideoEditingView",
            actions: ["resetExportedURL"],
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

export * from "./generate-reel-machine.types.js";
