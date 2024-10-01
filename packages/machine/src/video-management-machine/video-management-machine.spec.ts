import { describe, expect, vi, it } from "vitest";
import { getVideoManagementMachine } from "./video-management-machine.js";
import {
  ContextFrom,
  createActor,
  EventFrom,
  fromPromise,
  StateFrom,
  StateValueFrom,
} from "xstate";
import {
  ListVideosOutput,
  RemoveVideoOutput,
  ViewVideoOutput,
} from "@via/core/video-manager";

describe("video-management-machine", () => {
  const fetchMock = vi.fn();
  const videoManagementMachine = getVideoManagementMachine(fetchMock);

  type Scenerio = {
    name: string;
    initialState: StateValueFrom<typeof videoManagementMachine>;
    expectedState: StateValueFrom<typeof videoManagementMachine>;
    eventToSend: EventFrom<typeof videoManagementMachine>;
    initialContext: ContextFrom<typeof videoManagementMachine>;
    expectedContext: ContextFrom<typeof videoManagementMachine>;
    actors: {
      listVideosResponse: {
        success: boolean;
        data: ListVideosOutput;
      };
      addVideoResponse: {
        success: boolean;
        data: void;
      };
      viewVideoResponse:
        | {
            success: true;
            data: ViewVideoOutput;
          }
        | { success: false; data: null };
      deleteVideoResponse:
        | {
            success: true;
            data: RemoveVideoOutput;
          }
        | { success: false; data: null };
    };
  };

  const scenerios: Scenerio[] = [
    {
      name: "should reach VideosPage success state",
      initialState: { VideosPage: "idle" },
      expectedState: { VideosPage: "loadingVideosPageSuccess" },
      eventToSend: { type: "LOAD_VIDEOS_PAGE" },
      initialContext: {
        errorMessage: null,
        videos: [],
        originalVideos: [],
        videoDetails: null,
      },
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
        viewVideoResponse: {
          success: true,
          data: {
            videoUUID: "123",
            name: "Video 1",
            originalURL: "https://www.youtube.com/watch?v=123",
            descrption: "Video 1",
            createdAt: "2023-06-01T12:00:00.000Z",
            videoURL: "https://www.youtube.com/watch?v=123",
            fps: 30,
            frameCount: 100,
            width: 100,
            height: 100,
          },
        },
        deleteVideoResponse: {
          success: true,
          data: { videoUUID: "123" },
        },
      },

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
      expectedState: { VideosPage: "loadingVideosPageFailed" },
      initialContext: {
        errorMessage: null,
        videos: [],
        originalVideos: [],
        videoDetails: null,
      },
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
        viewVideoResponse: {
          success: true,
          data: {
            videoUUID: "123",
            name: "Video 1",
            originalURL: "https://www.youtube.com/watch?v=123",
            descrption: "Video 1",
            createdAt: "2023-06-01T12:00:00.000Z",
            videoURL: "https://www.youtube.com/watch?v=123",
            fps: 30,
            frameCount: 100,
            width: 100,
            height: 100,
          },
        },
        deleteVideoResponse: {
          success: true,
          data: { videoUUID: "123" },
        },
      },

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
      expectedState: { VideosPage: "searchingVideos" },
      initialContext: {
        errorMessage: null,
        videos: [
          { id: 1, description: "Video 1", name: "Video 1", uuid: "123" },
          { id: 2, description: "Video 2", name: "Video 2", uuid: "456" },
          { id: 3, description: "Video", name: "Video", uuid: "789" },
        ],
        originalVideos: [
          { id: 1, description: "Video 1", name: "Video 1", uuid: "123" },
          { id: 2, description: "Video 2", name: "Video 2", uuid: "456" },
          { id: 3, description: "Video", name: "Video", uuid: "789" },
        ],
        videoDetails: null,
      },

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
        viewVideoResponse: {
          success: true,
          data: {
            videoUUID: "123",
            name: "Video 1",
            originalURL: "https://www.youtube.com/watch?v=123",
            descrption: "Video 1",
            createdAt: "2023-06-01T12:00:00.000Z",
            videoURL: "https://www.youtube.com/watch?v=123",
            fps: 30,
            frameCount: 100,
            width: 100,
            height: 100,
          },
        },
        deleteVideoResponse: {
          success: true,
          data: { videoUUID: "123" },
        },
      },

      expectedContext: {
        videos: [
          { id: 1, description: "Video 1", name: "Video 1", uuid: "123" },
          { id: 2, description: "Video 2", name: "Video 2", uuid: "456" },
        ],
        originalVideos: [
          { id: 1, description: "Video 1", name: "Video 1", uuid: "123" },
          { id: 2, description: "Video 2", name: "Video 2", uuid: "456" },
          { id: 3, description: "Video", name: "Video", uuid: "789" },
        ],
        videoDetails: null,
        errorMessage: null,
      },
    },
    {
      name: "should reach NewVideoFormOpened state",
      initialState: { VideosPage: "idle" },
      initialContext: {
        errorMessage: null,
        videos: [],
        originalVideos: [],
        videoDetails: null,
      },
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
        viewVideoResponse: {
          success: true,
          data: {
            videoUUID: "123",
            name: "Video 1",
            originalURL: "https://www.youtube.com/watch?v=123",
            descrption: "Video 1",
            createdAt: "2023-06-01T12:00:00.000Z",
            videoURL: "https://www.youtube.com/watch?v=123",
            fps: 30,
            frameCount: 100,
            width: 100,
            height: 100,
          },
        },
        deleteVideoResponse: {
          success: true,
          data: { videoUUID: "123" },
        },
      },
      expectedState: { NewVideoFormOpened: "idle" },
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
      initialContext: {
        errorMessage: null,
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
        videoDetails: null,
      },
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
        viewVideoResponse: {
          success: true,
          data: {
            videoUUID: "123",
            name: "Video 1",
            originalURL: "https://www.youtube.com/watch?v=123",
            descrption: "Video 1",
            createdAt: "2023-06-01T12:00:00.000Z",
            videoURL: "https://www.youtube.com/watch?v=123",
            fps: 30,
            frameCount: 100,
            width: 100,
            height: 100,
          },
        },
        deleteVideoResponse: {
          success: true,
          data: { videoUUID: "123" },
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
      initialState: { NewVideoFormOpened: "idle" },
      initialContext: {
        errorMessage: null,
        videos: [],
        originalVideos: [],
        videoDetails: null,
      },
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
        viewVideoResponse: {
          success: true,
          data: {
            videoUUID: "123",
            name: "Video 1",
            originalURL: "https://www.youtube.com/watch?v=123",
            descrption: "Video 1",
            createdAt: "2023-06-01T12:00:00.000Z",
            videoURL: "https://www.youtube.com/watch?v=123",
            fps: 30,
            frameCount: 100,
            width: 100,
            height: 100,
          },
        },
        deleteVideoResponse: {
          success: true,
          data: { videoUUID: "123" },
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
    {
      name: "should reach video details success state when clicked on video row",
      initialState: { VideosPage: "idle" },
      expectedState: { VideoSelected: "idle" },
      initialContext: {
        errorMessage: null,
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
        videoDetails: null,
      },
      eventToSend: { type: "CLICK_VIDEO_ROW", input: { videoUUID: "123" } },
      actors: {
        listVideosResponse: {
          success: true,
          data: [],
        },
        addVideoResponse: {
          success: true,
          data: undefined,
        },
        viewVideoResponse: {
          success: true,
          data: {
            videoUUID: "123",
            name: "Video 1",
            originalURL: "https://www.youtube.com/watch?v=123",
            descrption: "Video 1",
            createdAt: "2023-06-01T12:00:00.000Z",
            videoURL: "https://www.youtube.com/watch?v=123",
            fps: 30,
            frameCount: 100,
            width: 100,
            height: 100,
          },
        },
        deleteVideoResponse: {
          success: true,
          data: { videoUUID: "123" },
        },
      },

      expectedContext: {
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
        videoDetails: {
          videoUUID: "123",
          name: "Video 1",
          originalURL: "https://www.youtube.com/watch?v=123",
          descrption: "Video 1",
          createdAt: "2023-06-01T12:00:00.000Z",
          videoURL: "https://www.youtube.com/watch?v=123",
          fps: 30,
          frameCount: 100,
          width: 100,
          height: 100,
        },
        errorMessage: null,
      },
    },
    {
      name: "should reach video details failed state when clicked on video row",
      initialState: { VideosPage: "idle" },
      expectedState: { VideosPage: "loadingVideoDetailsFailed" },
      initialContext: {
        errorMessage: null,
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
        videoDetails: null,
      },
      eventToSend: { type: "CLICK_VIDEO_ROW", input: { videoUUID: "123" } },
      actors: {
        listVideosResponse: {
          success: true,
          data: [],
        },
        addVideoResponse: {
          success: true,
          data: undefined,
        },
        viewVideoResponse: {
          success: false,
          data: null,
        },
        deleteVideoResponse: {
          success: true,
          data: { videoUUID: "123" },
        },
      },

      expectedContext: {
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
        videoDetails: null,
        errorMessage: "Error loading video details",
      },
    },
    {
      name: "should reach deleting video success state when clicked on delete video row",
      initialState: { VideoSelected: "idle" },
      expectedState: { VideoSelected: "deletingVideoSuccess" },
      initialContext: {
        errorMessage: null,
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
        videoDetails: {
          videoUUID: "123",
          name: "Video 1",
          originalURL: "https://www.youtube.com/watch?v=123",
          descrption: "Video 1",
          createdAt: "2023-06-01T12:00:00.000Z",
          videoURL: "https://www.youtube.com/watch?v=123",
          fps: 30,
          frameCount: 100,
          width: 100,
          height: 100,
        },
      },
      eventToSend: { type: "CLICK_DELETE_VIDEO", input: { videoUUID: "123" } },
      actors: {
        listVideosResponse: {
          success: true,
          data: [],
        },
        addVideoResponse: {
          success: true,
          data: undefined,
        },
        viewVideoResponse: {
          success: true,
          data: {
            videoUUID: "123",
            name: "Video 1",
            originalURL: "https://www.youtube.com/watch?v=123",
            descrption: "Video 1",
            createdAt: "2023-06-01T12:00:00.000Z",
            videoURL: "https://www.youtube.com/watch?v=123",
            fps: 30,
            frameCount: 100,
            width: 100,
            height: 100,
          },
        },
        deleteVideoResponse: {
          success: true,
          data: { videoUUID: "123" },
        },
      },

      expectedContext: {
        videos: [
          { id: 2, description: "Video 2", name: "Video 2", uuid: "456" },
          { id: 3, description: "Video", name: "Video", uuid: "789" },
        ],
        originalVideos: [
          { id: 2, description: "Video 2", name: "Video 2", uuid: "456" },
          { id: 3, description: "Videos", name: "Video", uuid: "789" },
        ],
        videoDetails: null,
        errorMessage: null,
      },
    },
    {
      name: "should reach deleting video failed state when clicked on delete video row",
      initialState: { VideoSelected: "idle" },
      expectedState: { VideoSelected: "deletingVideoFailed" },
      initialContext: {
        errorMessage: null,
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
        videoDetails: null,
      },
      eventToSend: { type: "CLICK_DELETE_VIDEO", input: { videoUUID: "123" } },
      actors: {
        listVideosResponse: {
          success: true,
          data: [],
        },
        addVideoResponse: {
          success: true,
          data: undefined,
        },
        viewVideoResponse: {
          success: true,
          data: {
            videoUUID: "123",
            name: "Video 1",
            originalURL: "https://www.youtube.com/watch?v=123",
            descrption: "Video 1",
            createdAt: "2023-06-01T12:00:00.000Z",
            videoURL: "https://www.youtube.com/watch?v=123",
            fps: 30,
            frameCount: 100,
            width: 100,
            height: 100,
          },
        },
        deleteVideoResponse: {
          success: false,
          data: null,
        },
      },

      expectedContext: {
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
        videoDetails: null,
        errorMessage: "Error deleting video",
      },
    },
    {
      name: "should reach add video success state when clicked on add video button",
      initialState: { NewVideoFormOpened: "idle" },
      expectedState: { NewVideoFormOpened: "addingVideoSuccess" },
      initialContext: {
        errorMessage: null,
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
        videoDetails: null,
      },
      eventToSend: {
        type: "CLICK_ADD_VIDEO",
        input: {
          name: "Video 1",
          description: "Video 1",
          youtubeURL: "https://www.youtube.com/watch?v=123",
        },
      },
      actors: {
        listVideosResponse: {
          success: true,
          data: [],
        },
        addVideoResponse: {
          success: true,
          data: undefined,
        },
        viewVideoResponse: {
          success: true,
          data: {
            videoUUID: "123",
            name: "Video 1",
            originalURL: "https://www.youtube.com/watch?v=123",
            descrption: "Video 1",
            createdAt: "2023-06-01T12:00:00.000Z",
            videoURL: "https://www.youtube.com/watch?v=123",
            fps: 30,
            frameCount: 100,
            width: 100,
            height: 100,
          },
        },
        deleteVideoResponse: {
          success: true,
          data: { videoUUID: "123" },
        },
      },

      expectedContext: {
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
        videoDetails: null,
        errorMessage: null,
      },
    },
    {
      name: "should reach video selected state when clicked on video row when already selected",
      initialState: { VideoSelected: "idle" },
      expectedState: { VideosPage: "loadingVideoDetailsSuccess" },
      initialContext: {
        errorMessage: null,
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
        videoDetails: null,
      },
      eventToSend: { type: "CLICK_VIDEO_ROW", input: { videoUUID: "123" } },
      actors: {
        listVideosResponse: {
          success: true,
          data: [],
        },
        addVideoResponse: {
          success: true,
          data: undefined,
        },
        viewVideoResponse: {
          success: true,
          data: {
            videoUUID: "123",
            name: "Video 1",
            originalURL: "https://www.youtube.com/watch?v=123",
            descrption: "Video 1",
            createdAt: "2023-06-01T12:00:00.000Z",
            videoURL: "https://www.youtube.com/watch?v=123",
            fps: 30,
            frameCount: 100,
            width: 100,
            height: 100,
          },
        },
        deleteVideoResponse: {
          success: true,
          data: { videoUUID: "123" },
        },
      },

      expectedContext: {
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
        videoDetails: {
          videoUUID: "123",
          name: "Video 1",
          originalURL: "https://www.youtube.com/watch?v=123",
          descrption: "Video 1",
          createdAt: "2023-06-01T12:00:00.000Z",
          videoURL: "https://www.youtube.com/watch?v=123",
          fps: 30,
          frameCount: 100,
          width: 100,
          height: 100,
        },
        errorMessage: null,
      },
    },
    {
      name: "should reach new video form open state when clicked on new video button from video selected state",
      initialState: { VideoSelected: "idle" },
      expectedState: { NewVideoFormOpened: "idle" },
      initialContext: {
        errorMessage: null,
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
        videoDetails: null,
      },
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
        viewVideoResponse: {
          success: true,
          data: {
            videoUUID: "123",
            name: "Video 1",
            originalURL: "https://www.youtube.com/watch?v=123",
            descrption: "Video 1",
            createdAt: "2023-06-01T12:00:00.000Z",
            videoURL: "https://www.youtube.com/watch?v=123",
            fps: 30,
            frameCount: 100,
            width: 100,
            height: 100,
          },
        },
        deleteVideoResponse: {
          success: true,
          data: { videoUUID: "123" },
        },
      },
      expectedContext: {
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
        videoDetails: null,
        errorMessage: null,
      },
    },
    {
      name: "should reach searching videos state when clicked on search video button from video selected state",
      initialState: { VideoSelected: "idle" },
      expectedState: { VideosPage: "searchingVideos" },
      initialContext: {
        errorMessage: null,
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
        videoDetails: null,
      },
      eventToSend: { type: "SEARCH_VIDEO", keyword: "Video 1" },
      actors: {
        listVideosResponse: {
          success: true,
          data: [],
        },
        addVideoResponse: {
          success: true,
          data: undefined,
        },
        viewVideoResponse: {
          success: true,
          data: {
            videoUUID: "123",
            name: "Video 1",
            originalURL: "https://www.youtube.com/watch?v=123",
            descrption: "Video 1",
            createdAt: "2023-06-01T12:00:00.000Z",
            videoURL: "https://www.youtube.com/watch?v=123",
            fps: 30,
            frameCount: 100,
            width: 100,
            height: 100,
          },
        },
        deleteVideoResponse: {
          success: true,
          data: { videoUUID: "123" },
        },
      },

      expectedContext: {
        videos: [
          { id: 1, description: "Video 1", name: "Video 1", uuid: "123" },
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
      name: "on deleting the video, it should delete the video from the list",
      initialState: { VideoSelected: "idle" },
      expectedState: { VideosPage: "idle" },
      eventToSend: { type: "CLICK_DELETE_VIDEO", input: { videoUUID: "123" } },
      initialContext: {
        errorMessage: null,
        videos: [
          { id: 1, description: "Video 1", name: "Video 1", uuid: "123" },
          { id: 2, description: "Video 2", name: "Video 2", uuid: "456" },
          { id: 3, description: "Video", name: "Video", uuid: "789" },
        ],
        originalVideos: [
          { id: 1, description: "Video 1", name: "Video 1", uuid: "123" },
          { id: 2, description: "Video 2", name: "Video 2", uuid: "456" },
          { id: 3, description: "Video", name: "Video", uuid: "789" },
        ],
        videoDetails: {
          videoUUID: "123",
          name: "Video 1",
          originalURL: "https://www.youtube.com/watch?v=123",
          descrption: "Video 1",
          createdAt: "2023-06-01T12:00:00.000Z",
          videoURL: "https://www.youtube.com/watch?v=123",
          fps: 30,
          frameCount: 100,
          width: 100,
          height: 100,
        },
      },
      actors: {
        listVideosResponse: {
          success: true,
          data: [
            { id: 1, description: "Video 1", name: "Video 1", uuid: "123" },
            { id: 2, description: "Video 2", name: "Video 2", uuid: "456" },
            { id: 3, description: "Videos", name: "Video", uuid: "789" },
          ],
        },
        addVideoResponse: {
          success: true,
          data: undefined,
        },
        viewVideoResponse: {
          success: true,
          data: {
            videoUUID: "123",
            name: "Video 1",
            originalURL: "https://www.youtube.com/watch?v=123",
            descrption: "Video 1",
            createdAt: "2023-06-01T12:00:00.000Z",
            videoURL: "https://www.youtube.com/watch?v=123",
            fps: 30,
            frameCount: 100,
            width: 100,
            height: 100,
          },
        },
        deleteVideoResponse: {
          success: true,
          data: { videoUUID: "123" },
        },
      },
      expectedContext: {
        videos: [
          { id: 2, description: "Video 2", name: "Video 2", uuid: "456" },
          { id: 3, description: "Video", name: "Video", uuid: "789" },
        ],
        originalVideos: [
          { id: 2, description: "Video 2", name: "Video 2", uuid: "456" },
          { id: 3, description: "Video", name: "Video", uuid: "789" },
        ],
        errorMessage: null,
        videoDetails: null,
      },
    },
  ];

  const scenerioToTest: string = "ALL";

  for (const scenerio of scenerios) {
    if (scenerioToTest !== "ALL" && scenerio.name !== scenerioToTest) continue;
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
          viewVideo: fromPromise<ViewVideoOutput>(async () => {
            if (!scenerio.actors.viewVideoResponse.success) {
              throw new Error("Error loading video details");
            }
            return scenerio.actors.viewVideoResponse.data;
          }),
          deleteVideo: fromPromise<RemoveVideoOutput>(async () => {
            if (!scenerio.actors.deleteVideoResponse.success) {
              throw new Error("Error deleting video");
            }
            return scenerio.actors.deleteVideoResponse.data;
          }),
        };

        const initialState = videoManagementMachine.resolveState({
          value: scenerio.initialState,
          context: scenerio.initialContext,
        });

        const actor = createActor(videoManagementMachine, {
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
