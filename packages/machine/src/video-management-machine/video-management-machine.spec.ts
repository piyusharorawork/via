import { describe, expect, vi, it } from "vitest";
import { getVideoManagementMachine } from "./video-management-machine.js";
import {
  createActor,
  EventFrom,
  fromPromise,
  StateFrom,
  StateValueFrom,
} from "xstate";
import { ListVideosOutput } from "@via/core/video-manager";

describe("video-management-machine", () => {
  const fetchMock = vi.fn();
  const videoManagementMachine = getVideoManagementMachine(fetchMock);

  type Scenerio = {
    name: string;
    initialState: StateValueFrom<typeof videoManagementMachine>;
    expectedState: StateValueFrom<typeof videoManagementMachine>;
    videos: ListVideosOutput;
    originalVideos: ListVideosOutput;
    eventToSend: EventFrom<typeof videoManagementMachine>;
    expectedContext: StateFrom<typeof videoManagementMachine>["context"];
    actors: {
      listVideosResponse: {
        success: boolean;
        data: ListVideosOutput;
      };
      addVideoResponse: {
        success: boolean;
        data: void;
      };
    };
  };

  const scenerios: Scenerio[] = [
    {
      name: "should reach VideosPage success state",
      initialState: { VideosPage: "idle" },
      videos: [],
      originalVideos: [],
      eventToSend: { type: "LOAD_VIDEOS_PAGE" },
      actors: {
        listVideosResponse: {
          success: true,
          data: [
            { id: 1, description: "Video 1", name: "Video 1", uuid: "123" },
          ],
        },
        addVideoResponse: {
          success: true,
          data: undefined,
        },
      },
      expectedState: { VideosPage: "loadingVideosPageSuccess" },
      expectedContext: {
        videos: [
          { id: 1, description: "Video 1", name: "Video 1", uuid: "123" },
        ],
        originalVideos: [
          { id: 1, description: "Video 1", name: "Video 1", uuid: "123" },
        ],
        videoDetails: null,
        errorMessage: null,
      },
    },
    {
      name: "should reach loadingVideosPageFailed state",
      initialState: { VideosPage: "idle" },
      videos: [],
      originalVideos: [],
      eventToSend: { type: "LOAD_VIDEOS_PAGE" },
      actors: {
        listVideosResponse: {
          success: false,
          data: [],
        },
        addVideoResponse: {
          success: true,
          data: undefined,
        },
      },
      expectedState: { VideosPage: "loadingVideosPageFailed" },
      expectedContext: {
        errorMessage: "Error loading videos",
        videos: [],
        originalVideos: [],
        videoDetails: null,
      },
    },
    {
      name: "should reach searchingVideos state",
      initialState: { VideosPage: "idle" },
      videos: [
        { id: 1, description: "Video 1", name: "Video 1", uuid: "123" },
        { id: 2, description: "Video 2", name: "Video 2", uuid: "456" },
        { id: 3, description: "Video", name: "Video", uuid: "789" },
      ],
      originalVideos: [
        { id: 1, description: "Video 1", name: "Video 1", uuid: "123" },
        { id: 2, description: "Video 2", name: "Video 2", uuid: "456" },
        { id: 3, description: "Videos", name: "Video", uuid: "789" },
      ],
      eventToSend: { type: "SEARCH_VIDEO", keyword: "Video " },
      actors: {
        listVideosResponse: {
          success: true,
          data: [],
        },
        addVideoResponse: {
          success: true,
          data: undefined,
        },
      },

      expectedState: { VideosPage: "searchingVideos" },
      expectedContext: {
        videos: [
          { id: 1, description: "Video 1", name: "Video 1", uuid: "123" },
          { id: 2, description: "Video 2", name: "Video 2", uuid: "456" },
        ],
        originalVideos: [
          { id: 1, description: "Video 1", name: "Video 1", uuid: "123" },
          { id: 2, description: "Video 2", name: "Video 2", uuid: "456" },
          { id: 3, description: "Videos", name: "Video", uuid: "789" },
        ],
        videoDetails: null,
        errorMessage: null,
      },
    },
    {
      name: "should reach NewVideFormOpened state",
      initialState: { VideosPage: "idle" },
      videos: [],
      originalVideos: [],
      eventToSend: { type: "CLICK_NEW_VIDEO_BUTTON" },
      actors: {
        listVideosResponse: {
          success: true,
          data: [],
        },
        addVideoResponse: {
          success: true,
          data: undefined,
        },
      },
      expectedState: { NewVideFormOpened: "idle" },
      expectedContext: {
        errorMessage: null,
        videos: [],
        originalVideos: [],
        videoDetails: null,
      },
    },
    {
      name: "should reach searchingVideos state with no results",
      initialState: { VideosPage: "idle" },
      videos: [
        { id: 1, description: "Video 1", name: "Video 1", uuid: "123" },
        { id: 2, description: "Video 2", name: "Video 2", uuid: "456" },
        { id: 3, description: "Video", name: "Video", uuid: "789" },
      ],
      originalVideos: [
        { id: 1, description: "Video 1", name: "Video 1", uuid: "123" },
        { id: 2, description: "Video 2", name: "Video 2", uuid: "456" },
        { id: 3, description: "Videos", name: "Video", uuid: "789" },
      ],
      eventToSend: { type: "SEARCH_VIDEO", keyword: "Video 4" },
      actors: {
        listVideosResponse: {
          success: true,
          data: [],
        },
        addVideoResponse: {
          success: true,
          data: undefined,
        },
      },

      expectedState: { VideosPage: "searchingVideos" },
      expectedContext: {
        videos: [],
        originalVideos: [
          { id: 1, description: "Video 1", name: "Video 1", uuid: "123" },
          { id: 2, description: "Video 2", name: "Video 2", uuid: "456" },
          { id: 3, description: "Videos", name: "Video", uuid: "789" },
        ],
        videoDetails: null,
        errorMessage: null,
      },
    },
    {
      name: "should reach videos page idle when new form closed",
      initialState: { NewVideFormOpened: "idle" },
      videos: [],
      originalVideos: [],
      eventToSend: { type: "CLOSE_ADD_VIDEO_FORM" },
      actors: {
        listVideosResponse: {
          success: true,
          data: [],
        },
        addVideoResponse: {
          success: true,
          data: undefined,
        },
      },
      expectedState: { VideosPage: "idle" },
      expectedContext: {
        errorMessage: null,
        videos: [],
        originalVideos: [],
        videoDetails: null,
      },
    },
  ];

  for (const scenerio of scenerios) {
    it(scenerio.name, () => {
      return new Promise<void>((done) => {
        videoManagementMachine.implementations.actors = {
          listVideos: fromPromise<ListVideosOutput>(async () => {
            if (!scenerio.actors.listVideosResponse.success) {
              throw new Error("Error loading videos");
            }
            return scenerio.actors.listVideosResponse.data;
          }),
          addVideo: fromPromise<void>(async () => {
            if (!scenerio.actors.addVideoResponse.success) {
              throw new Error("Error adding video");
            }
            return scenerio.actors.addVideoResponse.data;
          }),
        };

        const initialState = videoManagementMachine.resolveState({
          value: scenerio.initialState,
          context: {
            originalVideos: scenerio.originalVideos,
            videos: scenerio.videos,
            errorMessage: null,
            videoDetails: null,
          },
        });

        const actor = createActor(videoManagementMachine, {
          input: {
            originalVideos: scenerio.originalVideos,
            videos: scenerio.videos,
          },
          snapshot: initialState,
        });

        actor.subscribe((state) => {
          //   console.log(state.value);
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
