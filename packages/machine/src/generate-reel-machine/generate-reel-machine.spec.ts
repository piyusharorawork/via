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
      initialState: { GenerateFormView: "idle" },
      initialContext: {
        errorMessage: null,
        generateReelOutput: null,
        exportedVideoURL: "",
        progress: 0,
        videoDescription: "",
        quote: "",
      },
      expectedState: { GenerateFormView: "updatingVideoDescription" },
      expectedContext: {
        errorMessage: null,
        generateReelOutput: null,
        exportedVideoURL: "",
        progress: 0,
        videoDescription: "people walking",
        quote: "",
      },
      eventToSend: {
        type: "UPDATE_VIDEO_DESCRIPTION",
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
      initialState: { GenerateFormView: "idle" },
      initialContext: {
        errorMessage: null,
        generateReelOutput: null,
        exportedVideoURL: "",
        progress: 0,
        videoDescription: "",
        quote: "",
      },
      expectedState: { GenerateFormView: "updatingQuote" },
      expectedContext: {
        errorMessage: null,
        generateReelOutput: null,
        exportedVideoURL: "",
        progress: 0,
        videoDescription: "",
        quote: "Lets walk",
      },
      eventToSend: {
        type: "UPDATE_QUOTE",
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
      initialState: { GenerateFormView: "idle" },
      initialContext: {
        errorMessage: null,
        generateReelOutput: null,
        exportedVideoURL: "",
        progress: 0,
        videoDescription: "",
        quote: "Lets walk",
      },
      expectedState: { GenerateFormView: "idle" },
      expectedContext: {
        errorMessage: null,
        generateReelOutput: null,
        exportedVideoURL: "",
        progress: 0,
        videoDescription: "",
        quote: "Lets walk",
      },
      eventToSend: {
        type: "CLICK_GENERATE_REEL",
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
      initialState: { GenerateFormView: "idle" },
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
        type: "CLICK_GENERATE_REEL",
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
      name: "should reach generating reel success state",
      initialState: { GenerateFormView: "idle" },
      initialContext: {
        errorMessage: null,
        generateReelOutput: null,
        exportedVideoURL: "",
        progress: 0,
        videoDescription: "people walking",
        quote: "Lets walk",
      },
      expectedState: { GenerateFormView: "generatingReelSuccess" },
      expectedContext: {
        errorMessage: null,
        generateReelOutput: {
          videoId: 1,
          videoUUID: "123",
          videoURL: "https://www.youtube.com/watch?v=123",
          width: 100,
          height: 100,
          fps: 30,
          frames: 100,
        },
        exportedVideoURL: "",
        progress: 0,
        videoDescription: "people walking",
        quote: "Lets walk",
      },
      eventToSend: {
        type: "CLICK_GENERATE_REEL",
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
      initialState: { GenerateFormView: "idle" },
      initialContext: {
        errorMessage: null,
        generateReelOutput: null,
        exportedVideoURL: "",
        progress: 0,
        videoDescription: "people walking",
        quote: "Lets walk",
      },
      expectedState: { GenerateFormView: "generateReelFailed" },
      expectedContext: {
        errorMessage: "Error Generating Reel",
        generateReelOutput: null,
        exportedVideoURL: "",
        progress: 0,
        videoDescription: "people walking",
        quote: "Lets walk",
      },
      eventToSend: {
        type: "CLICK_GENERATE_REEL",
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
        GenerateFormView: "idle",
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
        type: "CLICK_GENERATE_REEL",
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
            async ({ input }) => {
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
          console.log(state.value);

          if (state.matches(scenerio.expectedState)) {
            expect(state.context).toStrictEqual(scenerio.expectedContext);
            done();
          }
        });
        actor.start();
        actor.send(scenerio.eventToSend);
      });
    });
  }
});
