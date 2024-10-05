import { describe, expect, vi, it } from "vitest";
import { getGenerateReelMachine } from "./generate-reel-machine.js";
import {
  ActorLogicFrom,
  EventFrom,
  StateFrom,
  StateValueFrom,
  ContextFrom,
  createActor,
  fromPromise,
} from "xstate";
import { GenerateReelInput, GenerateReelOutput } from "@via/core/video-manager";
import { deepEqual } from "../machine.util.js";

describe("generate-reel-machine", () => {
  type Scenerio = {
    name: string;
    initialState: StateValueFrom<typeof generateReelMachine>;
    expectedState: StateValueFrom<typeof generateReelMachine>;
    initialContext: ContextFrom<typeof generateReelMachine>;
    expectedContext: ContextFrom<typeof generateReelMachine>;
    eventToSend: EventFrom<typeof generateReelMachine>;
    actors: {
      generateReelResponse:
        | {
            success: true;
            data: GenerateReelOutput;
          }
        | { success: false; data: null };
    };
  };

  const scenerios: Scenerio[] = [
    {
      name: "should update video description",
      initialState: { GenerateFormView: "form" },
      initialContext: {
        errorMessage: null,
        generateReelOutput: null,
        exportedVideoURL: "",
        progress: 0,
        videoDescription: "",
        quote: "",
      },
      expectedState: { GenerateFormView: "form" },
      expectedContext: {
        errorMessage: null,
        generateReelOutput: null,
        exportedVideoURL: "",
        progress: 0,
        videoDescription: "people walking",
        quote: "",
      },
      eventToSend: {
        type: "Form:UpdateVideoDescription",
        videoDescription: "people walking",
      },
      actors: {
        generateReelResponse: {
          success: true,
          data: {
            videoId: 1,
            videoUUID: "123",
            videoURL: "https://www.youtube.com/watch?v=123",
            width: 100,
            height: 100,
            fps: 30,
            frames: 100,
          },
        },
      },
    },
    {
      name: "should update quote",
      initialState: { GenerateFormView: "form" },
      initialContext: {
        errorMessage: null,
        generateReelOutput: null,
        exportedVideoURL: "",
        progress: 0,
        videoDescription: "",
        quote: "",
      },
      expectedState: { GenerateFormView: "form" },
      expectedContext: {
        errorMessage: null,
        generateReelOutput: null,
        exportedVideoURL: "",
        progress: 0,
        videoDescription: "",
        quote: "Lets walk",
      },
      eventToSend: {
        type: "Form:UpdateQuote",
        quote: "Lets walk",
      },
      actors: {
        generateReelResponse: {
          success: true,
          data: {
            videoId: 1,
            videoUUID: "123",
            videoURL: "https://www.youtube.com/watch?v=123",
            width: 100,
            height: 100,
            fps: 30,
            frames: 100,
          },
        },
      },
    },
    {
      name: "should click generate reel on empty video descrtiption remain in idle",
      initialState: { GenerateFormView: "form" },
      initialContext: {
        errorMessage: null,
        generateReelOutput: null,
        exportedVideoURL: "",
        progress: 0,
        videoDescription: "",
        quote: "Lets walk",
      },
      expectedState: { GenerateFormView: "form" },
      expectedContext: {
        errorMessage: null,
        generateReelOutput: null,
        exportedVideoURL: "",
        progress: 0,
        videoDescription: "",
        quote: "Lets walk",
      },
      eventToSend: {
        type: "Form:GenerateReel",
      },
      actors: {
        generateReelResponse: {
          success: true,
          data: {
            videoId: 1,
            videoUUID: "123",
            videoURL: "https://www.youtube.com/watch?v=123",
            width: 100,
            height: 100,
            fps: 30,
            frames: 100,
          },
        },
      },
    },
    {
      name: "should reach generating reel state when clicked on generate reel for valid input",
      initialState: { GenerateFormView: "form" },
      initialContext: {
        errorMessage: null,
        generateReelOutput: null,
        exportedVideoURL: "",
        progress: 0,
        videoDescription: "people walking",
        quote: "Lets walk",
      },
      expectedState: { GenerateFormView: "generatingReel" },
      expectedContext: {
        errorMessage: null,
        generateReelOutput: null,
        exportedVideoURL: "",
        progress: 0,
        videoDescription: "people walking",
        quote: "Lets walk",
      },
      eventToSend: {
        type: "Form:GenerateReel",
      },
      actors: {
        generateReelResponse: {
          success: true,
          data: {
            videoId: 1,
            videoUUID: "123",
            videoURL: "https://www.youtube.com/watch?v=123",
            width: 100,
            height: 100,
            fps: 30,
            frames: 100,
          },
        },
      },
    },
    {
      name: "should reach generating reel failed state",
      initialState: { GenerateFormView: "form" },
      initialContext: {
        errorMessage: null,
        generateReelOutput: null,
        exportedVideoURL: "",
        progress: 0,
        videoDescription: "people walking",
        quote: "Lets walk",
      },
      expectedState: { GenerateFormView: "form" },
      expectedContext: {
        errorMessage: "Error Generating Reel",
        generateReelOutput: null,
        exportedVideoURL: "",
        progress: 0,
        videoDescription: "people walking",
        quote: "Lets walk",
      },
      eventToSend: {
        type: "Form:GenerateReel",
      },
      actors: {
        generateReelResponse: {
          success: false,
          data: null,
        },
      },
    },
    {
      name: "should reach video editing view post clicking generate reel",
      initialState: {
        GenerateFormView: "form",
      },
      expectedState: {
        VideoEditingView: "idle",
      },
      initialContext: {
        errorMessage: null,
        generateReelOutput: null,
        exportedVideoURL: "",
        progress: 0,
        videoDescription: "people walking",
        quote: "Lets walk",
      },
      eventToSend: {
        type: "Form:GenerateReel",
      },
      actors: {
        generateReelResponse: {
          success: true,
          data: {
            videoURL: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            fps: 30,
            frames: 100,
            width: 1920,
            height: 1080,
            videoId: 1,
            videoUUID: "123",
          },
        },
      },
      expectedContext: {
        videoDescription: "people walking",
        quote: "Lets walk",
        errorMessage: null,
        generateReelOutput: {
          videoURL: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          fps: 30,
          frames: 100,
          width: 1920,
          height: 1080,
          videoId: 1,
          videoUUID: "123",
        },
        exportedVideoURL: "",
        progress: 0,
      },
    },
    {
      name: "should reach generate form view when clicked on close button on edit view",
      initialState: { VideoEditingView: "idle" },
      expectedState: { GenerateFormView: "form" },
      eventToSend: { type: "VideoEditor:Close" },
      initialContext: {
        errorMessage: "",
        exportedVideoURL: "",
        generateReelOutput: {
          fps: 30,
          frames: 100,
          height: 1080,
          videoId: 1,
          videoUUID: "123",
          videoURL: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          width: 1920,
        },
        progress: 0,
        videoDescription: "people walking",
        quote: "Lets walk",
      },
      expectedContext: {
        errorMessage: "",
        exportedVideoURL: "",
        generateReelOutput: null,
        progress: 0,
        videoDescription: "people walking",
        quote: "Lets walk",
      },
      actors: {
        generateReelResponse: {
          success: true,
          data: {
            videoId: 1,
            videoUUID: "123",
            videoURL: "https://www.youtube.com/watch?v=123",
            width: 100,
            height: 100,
            fps: 30,
            frames: 100,
          },
        },
      },
    },
    {
      name: "should reach export view when clicking export button",
      initialState: { VideoEditingView: "idle" },
      expectedState: { ExportReelView: "idle" },
      eventToSend: { type: "VideoEditor:Export" },
      initialContext: {
        errorMessage: "",
        exportedVideoURL: "",
        generateReelOutput: {
          fps: 30,
          frames: 100,
          height: 1080,
          videoId: 1,
          videoUUID: "123",
          videoURL: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          width: 1920,
        },
        progress: 0,
        videoDescription: "people walking",
        quote: "Lets walk",
      },
      expectedContext: {
        errorMessage: "",
        exportedVideoURL: "",
        generateReelOutput: {
          fps: 30,
          frames: 100,
          height: 1080,
          videoId: 1,
          videoUUID: "123",
          videoURL: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          width: 1920,
        },
        progress: 0,
        videoDescription: "people walking",
        quote: "Lets walk",
      },
      actors: {
        generateReelResponse: {
          success: true,
          data: {
            videoId: 1,
            videoUUID: "123",
            videoURL: "https://www.youtube.com/watch?v=123",
            width: 100,
            height: 100,
            fps: 30,
            frames: 100,
          },
        },
      },
    },
    {
      name: "should update the progress of exporting reel",
      initialState: { ExportReelView: "idle" },
      expectedState: { ExportReelView: "idle" },
      eventToSend: { type: "UPDATE_PROGRESS", amount: 10 },
      initialContext: {
        errorMessage: "",
        exportedVideoURL: "",
        generateReelOutput: {
          fps: 30,
          frames: 100,
          height: 1080,
          videoId: 1,
          videoUUID: "123",
          videoURL: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          width: 1920,
        },
        progress: 0,
        videoDescription: "people walking",
        quote: "Lets walk",
      },
      expectedContext: {
        errorMessage: "",
        exportedVideoURL: "",
        generateReelOutput: {
          fps: 30,
          frames: 100,
          height: 1080,
          videoId: 1,
          videoUUID: "123",
          videoURL: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          width: 1920,
        },
        progress: 10,
        videoDescription: "people walking",
        quote: "Lets walk",
      },
      actors: {
        generateReelResponse: {
          success: true,
          data: {
            videoId: 1,
            videoUUID: "123",
            videoURL: "https://www.youtube.com/watch?v=123",
            width: 100,
            height: 100,
            fps: 30,
            frames: 100,
          },
        },
      },
    },
    {
      name: "should reach video editor view when clicking cancel export button",
      initialState: { ExportReelView: "idle" },
      expectedState: { VideoEditingView: "idle" },
      eventToSend: { type: "CANCEL_EXPORT" },
      initialContext: {
        errorMessage: "",
        exportedVideoURL: "",
        generateReelOutput: {
          fps: 30,
          frames: 100,
          height: 1080,
          videoId: 1,
          videoUUID: "123",
          videoURL: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          width: 1920,
        },
        progress: 0,
        videoDescription: "people walking",
        quote: "Lets walk",
      },
      expectedContext: {
        errorMessage: "",
        exportedVideoURL: "",
        generateReelOutput: {
          fps: 30,
          frames: 100,
          height: 1080,
          videoId: 1,
          videoUUID: "123",
          videoURL: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          width: 1920,
        },
        progress: 0,
        videoDescription: "people walking",
        quote: "Lets walk",
      },
      actors: {
        generateReelResponse: {
          success: true,
          data: {
            videoId: 1,
            videoUUID: "123",
            videoURL: "https://www.youtube.com/watch?v=123",
            width: 100,
            height: 100,
            fps: 30,
            frames: 100,
          },
        },
      },
    },
    {
      name: "should reach video download view when export finished",
      initialState: { ExportReelView: "idle" },
      expectedState: { VideoDownloadView: "idle" },
      eventToSend: {
        type: "EXPORT_FINISHED",
        videoURL: "https://www.youtube.com/watch?v=123",
      },
      initialContext: {
        errorMessage: "",
        exportedVideoURL: "https://www.youtube.com/watch?v=123",
        generateReelOutput: {
          fps: 30,
          frames: 100,
          height: 1080,
          videoId: 1,
          videoUUID: "123",
          videoURL: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          width: 1920,
        },
        progress: 0,
        videoDescription: "people walking",
        quote: "Lets walk",
      },
      expectedContext: {
        errorMessage: "",
        exportedVideoURL: "https://www.youtube.com/watch?v=123",
        generateReelOutput: {
          fps: 30,
          frames: 100,
          height: 1080,
          videoId: 1,
          videoUUID: "123",
          videoURL: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          width: 1920,
        },
        progress: 0,
        videoDescription: "people walking",
        quote: "Lets walk",
      },
      actors: {
        generateReelResponse: {
          success: true,
          data: {
            videoId: 1,
            videoUUID: "123",
            videoURL: "https://www.youtube.com/watch?v=123",
            width: 100,
            height: 100,
            fps: 30,
            frames: 100,
          },
        },
      },
    },
    {
      name: "should reach video editor view when clicking close button on video download view",
      initialState: { VideoDownloadView: "idle" },
      expectedState: { VideoEditingView: "idle" },
      eventToSend: { type: "CLOSE_PREVIEW" },
      initialContext: {
        errorMessage: "",
        exportedVideoURL: "https://www.youtube.com/watch?v=123",
        generateReelOutput: {
          fps: 30,
          frames: 100,
          height: 1080,
          videoId: 1,
          videoUUID: "123",
          videoURL: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          width: 1920,
        },
        progress: 0,
        videoDescription: "people walking",
        quote: "Lets walk",
      },
      expectedContext: {
        errorMessage: "",
        exportedVideoURL: "",
        generateReelOutput: {
          fps: 30,
          frames: 100,
          height: 1080,
          videoId: 1,
          videoUUID: "123",
          videoURL: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          width: 1920,
        },
        progress: 0,
        videoDescription: "people walking",
        quote: "Lets walk",
      },
      actors: {
        generateReelResponse: {
          success: true,
          data: {
            videoId: 1,
            videoUUID: "123",
            videoURL: "https://www.youtube.com/watch?v=123",
            width: 100,
            height: 100,
            fps: 30,
            frames: 100,
          },
        },
      },
    },
  ];

  const fetchMock = vi.fn();
  const generateReelMachine = getGenerateReelMachine(fetchMock);

  const scenerioToTest: string = "ALL";

  for (const scenerio of scenerios) {
    if (scenerioToTest !== "ALL" && scenerio.name !== scenerioToTest) continue;
    it(scenerio.name, () => {
      return new Promise<void>((done) => {
        generateReelMachine.implementations.actors = {
          generateReel: fromPromise<GenerateReelOutput, GenerateReelInput>(
            async ({}) => {
              if (!scenerio.actors.generateReelResponse.success) {
                throw new Error("Error Generating Reel");
              }
              return scenerio.actors.generateReelResponse.data;
            }
          ),
        };
        const initialState = generateReelMachine.resolveState({
          value: scenerio.initialState,
          context: scenerio.initialContext,
        });
        const actor = createActor(generateReelMachine, {
          snapshot: initialState,
        });
        actor.subscribe((state) => {
          //console.log(state.value);

          if (state.matches(scenerio.expectedState)) {
            // console.log(state.context);
            // console.log(scenerio.expectedContext);
            if (deepEqual(state.context, scenerio.expectedContext)) done();
          }
        });
        actor.start();
        actor.send(scenerio.eventToSend);
      });
    });
  }
});
