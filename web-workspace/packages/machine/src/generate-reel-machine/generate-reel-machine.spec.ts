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
import {
  defaultGenerateReelActorResponses,
  defaultGenerateReelContext,
} from "./generate-reel.machine.constant.js";
import { GenerateReelActorResponses } from "./generate-reel-machine.types.js";

describe("generate-reel-machine", () => {
  type Scenerio = {
    name: string;
    initialState: StateValueFrom<typeof generateReelMachine>;
    expectedState: StateValueFrom<typeof generateReelMachine>;
    eventToSend: EventFrom<typeof generateReelMachine>;
    initialContext?: Partial<ContextFrom<typeof generateReelMachine>>;
    expectedContext?: Partial<ContextFrom<typeof generateReelMachine>>;
    actors?: Partial<GenerateReelActorResponses>;
  };

  const fetchMock = vi.fn();
  const generateReelMachine = getGenerateReelMachine(fetchMock);

  const testScenerios = (
    scenerios: Scenerio[],
    scenerioToTest: string,
    showLogs = false
  ) => {
    for (const scenerio of scenerios) {
      if (scenerioToTest !== "ALL" && scenerio.name !== scenerioToTest)
        continue;
      it(scenerio.name, () => {
        return new Promise<void>((done) => {
          const generateReelActorResponses: GenerateReelActorResponses = {
            ...defaultGenerateReelActorResponses,
            ...scenerio.actors,
          };

          generateReelMachine.implementations.actors = {
            generateReel: fromPromise<GenerateReelOutput, GenerateReelInput>(
              async ({}) => {
                if (!generateReelActorResponses.generateReelResponse.success) {
                  throw new Error("Error Generating Reel");
                }
                return generateReelActorResponses.generateReelResponse.data;
              }
            ),
          };
          const initialState = generateReelMachine.resolveState({
            value: scenerio.initialState,
            context: {
              ...defaultGenerateReelContext,
              ...scenerio.initialContext,
            },
          });
          const actor = createActor(generateReelMachine, {
            snapshot: initialState,
          });
          actor.subscribe((state) => {
            if (showLogs) console.log(state.value);

            if (state.matches(scenerio.expectedState)) {
              if (showLogs) {
                console.log(state.context);
                console.log({
                  ...defaultGenerateReelContext,
                  ...scenerio.expectedContext,
                });
              }

              if (
                deepEqual(state.context, {
                  ...defaultGenerateReelContext,
                  ...scenerio.expectedContext,
                })
              )
                done();
            }
          });
          actor.start();
          actor.send(scenerio.eventToSend);
        });
      });
    }
  };

  describe("Sending Form Events", () => {
    const scenerios: Scenerio[] = [
      {
        name: "should update video description",
        initialState: { GenerateFormView: "form" },
        expectedState: { GenerateFormView: "form" },
        eventToSend: {
          type: "Form:UpdateVideoDescription",
          videoDescription: "people walking",
        },
        expectedContext: {
          videoDescription: "people walking",
        },
      },
      {
        name: "should update quote",
        initialState: { GenerateFormView: "form" },
        expectedState: { GenerateFormView: "form" },
        expectedContext: {
          quote: "Lets walk",
        },
        eventToSend: {
          type: "Form:UpdateQuote",
          quote: "Lets walk",
        },
      },
      {
        name: "should click generate reel on empty video descrtiption remain in idle",
        initialState: { GenerateFormView: "form" },
        expectedState: { GenerateFormView: "form" },
        eventToSend: {
          type: "Form:GenerateReel",
        },
        initialContext: {
          quote: "Lets walk",
        },
        expectedContext: {
          quote: "Lets walk",
        },
      },
      {
        name: "should reach generating reel state when clicked on generate reel for valid input",
        initialState: { GenerateFormView: "form" },
        expectedState: { GenerateFormView: "generatingReel" },
        eventToSend: {
          type: "Form:GenerateReel",
        },
        initialContext: {
          videoDescription: "people walking",
          quote: "Lets walk",
        },

        expectedContext: {
          videoDescription: "people walking",
          quote: "Lets walk",
        },
      },
      {
        name: "should reach generating reel failed state",
        initialState: { GenerateFormView: "form" },
        expectedState: { GenerateFormView: "form" },
        eventToSend: {
          type: "Form:GenerateReel",
        },
        initialContext: {
          videoDescription: "people walking",
          quote: "Lets walk",
        },
        expectedContext: {
          errorMessage: "Error Generating Reel",
          videoDescription: "people walking",
          quote: "Lets walk",
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
        expectedState: "VideoEditingView",
        initialContext: {
          videoDescription: "people walking",
          quote: "Lets walk",
        },
        eventToSend: {
          type: "Form:GenerateReel",
        },
        expectedContext: {
          videoDescription: "people walking",
          quote: "Lets walk",
          generateReelOutput: {
            videoURL: "https://www.youtube.com/watch?v=123",
            fps: 30,
            frames: 100,
            width: 100,
            height: 100,
            videoId: 1,
            videoUUID: "123",
          },
          videoElements: [
            {
              type: "text",
              id: "1",
              textInfo: {
                text: "Lets walk",
                position: [0, 0, 0],
                color: "#ffffff",
                fontSize: 16,
                font: "Roboto",
              },
            },
          ],
        },
      },
    ];
    testScenerios(scenerios, "ALL", false);
  });

  describe("Sending Video Editor Events", () => {
    const scenerios: Scenerio[] = [
      {
        name: "should reach generate form view when clicked on close button on edit view",
        initialState: "VideoEditingView",
        expectedState: { GenerateFormView: "form" },
        eventToSend: { type: "VideoEditor:Close" },
        initialContext: {
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
          videoDescription: "people walking",
          quote: "Lets walk",
        },
      },
      {
        name: "should reach export view when clicking export button",
        initialState: "VideoEditingView",
        expectedState: "ExportReelView",
        eventToSend: { type: "VideoEditor:Export" },
        initialContext: {
          generateReelOutput: {
            fps: 30,
            frames: 100,
            height: 1080,
            videoId: 1,
            videoUUID: "123",
            videoURL: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            width: 1920,
          },
          videoDescription: "people walking",
          quote: "Lets walk",
        },
        expectedContext: {
          generateReelOutput: {
            fps: 30,
            frames: 100,
            height: 1080,
            videoId: 1,
            videoUUID: "123",
            videoURL: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            width: 1920,
          },
          videoDescription: "people walking",
          quote: "Lets walk",
        },
      },
      {
        name: "should update selected element when selecting element",
        initialState: "VideoEditingView",
        expectedState: "VideoEditingView",
        eventToSend: {
          type: "VideoEditor:SelectElement",
          element: {
            type: "text",
            id: "1",
            textInfo: {
              text: "some text",
              position: [0, 0, 0],
              color: "#000000",
              fontSize: 16,
              font: "Roboto",
            },
          },
        },
        initialContext: {
          generateReelOutput: {
            fps: 30,
            frames: 100,
            height: 100,
            videoId: 1,
            videoUUID: "123",
            videoURL: "https://www.youtube.com/watch?v=123",
            width: 100,
          },
          videoDescription: "people walking",
          quote: "Lets walk",
        },
        expectedContext: {
          generateReelOutput: {
            fps: 30,
            frames: 100,
            height: 100,
            videoId: 1,
            videoUUID: "123",
            videoURL: "https://www.youtube.com/watch?v=123",
            width: 100,
          },
          videoDescription: "people walking",
          quote: "Lets walk",
          selectedElement: {
            id: "1",
            type: "text",
            textInfo: {
              text: "some text",
              position: [0, 0, 0],
              color: "#000000",
              fontSize: 16,
              font: "Roboto",
            },
          },
        },
      },
      {
        name: "should set selected element to null when unselecting all",
        initialState: "VideoEditingView",
        expectedState: "VideoEditingView",
        eventToSend: {
          type: "VideoEditor:UnselectAll",
        },
        initialContext: {
          generateReelOutput: {
            fps: 30,
            frames: 100,
            height: 100,
            videoId: 1,
            videoUUID: "123",
            videoURL: "https://www.youtube.com/watch?v=123",
            width: 100,
          },
          videoDescription: "people walking",
          quote: "Lets walk",
          selectedElement: {
            id: "1",
            type: "text",
            textInfo: {
              text: "some text",
              position: [0, 0, 0],
              color: "#ffffff",
              fontSize: 16,
              font: "Roboto",
            },
          },
        },
        expectedContext: {
          generateReelOutput: {
            fps: 30,
            frames: 100,
            height: 100,
            videoId: 1,
            videoUUID: "123",
            videoURL: "https://www.youtube.com/watch?v=123",
            width: 100,
          },
          videoDescription: "people walking",
          quote: "Lets walk",
          selectedElement: null,
        },
      },
      {
        name: "should update element when updating element",
        initialState: "VideoEditingView",
        expectedState: "VideoEditingView",
        eventToSend: {
          type: "VideoEditor:UpdateElement",
          element: {
            type: "text",
            id: "1",
            textInfo: {
              text: "new text",
              position: [10, 10, 10],
              color: "#000000",
              fontSize: 12,
              font: "Poppins",
            },
          },
        },
        initialContext: {
          generateReelOutput: {
            fps: 30,
            frames: 100,
            height: 100,
            videoId: 1,
            videoUUID: "123",
            videoURL: "https://www.youtube.com/watch?v=123",
            width: 100,
          },
          videoDescription: "people walking",
          quote: "Lets walk",
          selectedElement: {
            id: "1",
            type: "text",
            textInfo: {
              text: "some text",
              position: [0, 0, 0],
              color: "#ffffff",
              fontSize: 16,
              font: "Roboto",
            },
          },
        },
        expectedContext: {
          generateReelOutput: {
            fps: 30,
            frames: 100,
            height: 100,
            videoId: 1,
            videoUUID: "123",
            videoURL: "https://www.youtube.com/watch?v=123",
            width: 100,
          },
          videoDescription: "people walking",
          quote: "Lets walk",
          videoElements: [
            {
              type: "text",
              id: "1",
              textInfo: {
                text: "new text",
                position: [10, 10, 10],
                color: "#000000",
                fontSize: 12,
                font: "Poppins",
              },
            },
          ],
          selectedElement: {
            id: "1",
            type: "text",
            textInfo: {
              text: "new text",
              position: [10, 10, 10],
              color: "#000000",
              fontSize: 12,
              font: "Poppins",
            },
          },
        },
      },
    ];
    testScenerios(scenerios, "ALL", false);
  });

  describe("Sending Export Reel Events", () => {
    const scenerios: Scenerio[] = [
      {
        name: "should update the progress of exporting reel",
        initialState: "ExportReelView",
        expectedState: "ExportReelView",
        eventToSend: { type: "ExportReel:UpdateProgress", amount: 10 },
        initialContext: {
          generateReelOutput: {
            fps: 30,
            frames: 100,
            height: 1080,
            videoId: 1,
            videoUUID: "123",
            videoURL: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            width: 1920,
          },
          videoDescription: "people walking",
          quote: "Lets walk",
        },
        expectedContext: {
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
      },
      {
        name: "should reach video editor view when clicking cancel export button",
        initialState: "ExportReelView",
        expectedState: "VideoEditingView",
        eventToSend: { type: "ExportReel:Cancel" },
        initialContext: {
          generateReelOutput: {
            fps: 30,
            frames: 100,
            height: 1080,
            videoId: 1,
            videoUUID: "123",
            videoURL: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            width: 1920,
          },
          videoDescription: "people walking",
          quote: "Lets walk",
        },
        expectedContext: {
          generateReelOutput: {
            fps: 30,
            frames: 100,
            height: 1080,
            videoId: 1,
            videoUUID: "123",
            videoURL: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            width: 1920,
          },
          videoDescription: "people walking",
          quote: "Lets walk",
        },
      },
      {
        name: "should reach video download view when export finished",
        initialState: "ExportReelView",
        expectedState: "VideoDownloadView",
        eventToSend: {
          type: "ExportReel:Finished",
          videoURL: "https://www.youtube.com/watch?v=123",
        },
        initialContext: {
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
          videoDescription: "people walking",
          quote: "Lets walk",
        },
        expectedContext: {
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
          videoDescription: "people walking",
          quote: "Lets walk",
        },
      },
    ];
    testScenerios(scenerios, "ALL", false);
  });

  describe("Video Preview Events", () => {
    const scenerios: Scenerio[] = [
      {
        name: "should reach video editor view when clicking close button on video download view",
        initialState: "VideoDownloadView",
        expectedState: "VideoEditingView",
        eventToSend: { type: "VideoPreview:Close" },
        initialContext: {
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
          videoDescription: "people walking",
          quote: "Lets walk",
        },
        expectedContext: {
          generateReelOutput: {
            fps: 30,
            frames: 100,
            height: 1080,
            videoId: 1,
            videoUUID: "123",
            videoURL: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            width: 1920,
          },
          videoDescription: "people walking",
          quote: "Lets walk",
        },
      },
    ];

    testScenerios(scenerios, "ALL", false);
  });
});
