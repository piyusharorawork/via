import { describe, test, expect, vi, Assertion, it } from "vitest";
import { getVideoManagementMachine } from "./video-management-machine.js";
import {
  ActorRefFrom,
  createActor,
  EventFrom,
  fromPromise,
  StateFrom,
} from "xstate";
import { AddVideoInput, ListVideosOutput } from "@via/core/video-manager";

describe("video-management-machine", () => {
  const fetchMock = vi.fn();
  const videoManagementMachine = getVideoManagementMachine(fetchMock);

  type Scenerio = {
    name: string;
    videos: ListVideosOutput;
    originalVideos: ListVideosOutput;
    eventToSend: EventFrom<typeof videoManagementMachine>;
    expectedState: StateFrom<typeof videoManagementMachine>["value"];
    expectedContext: StateFrom<typeof videoManagementMachine>["context"];
    listVideos: () => Promise<ListVideosOutput>;
    addVideo: () => Promise<void>;
  };

  const matchState = (
    actor: ActorRefFrom<typeof videoManagementMachine>,
    state: StateFrom<typeof videoManagementMachine>["value"],
    callback: (
      context: StateFrom<typeof videoManagementMachine>["context"]
    ) => void
  ) => {
    return new Promise<void>((resolve, reject) => {
      actor.subscribe((s) => {
        console.log(s.value); // TO log the state value
        if (s.matches(state)) {
          callback(s.context);
          return resolve();
        }
      });
    });
  };

  // TODO ADDING_VIDEO_SUCCESS , ADDING_VIDEO_FAILED , DELETING_VIDEO_SUCCESS , DELETING_VIDEO_FAILED, VIDEO_DETAILS_SUCCESS, VIDEO_DETAILS_FAILED
  // Need to create child machines

  const scenerios: Scenerio[] = [
    {
      name: "should reach GETTING_VIDEOS_SUCCESS state",
      videos: [],
      originalVideos: [],
      eventToSend: { type: "LOAD_VIDEOS_PAGE" },
      listVideos: async () => [
        { id: 1, description: "Video 1", name: "Video 1", uuid: "123" },
      ],
      addVideo: async () => {},
      expectedState: "GETTING_VIDEOS_SUCCESS",
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
      name: "should reach GETTING_VIDEOS_FAILED state",
      videos: [],
      originalVideos: [],
      eventToSend: { type: "LOAD_VIDEOS_PAGE" },
      listVideos: async () => {
        throw new Error("Error loading videos");
      },
      addVideo: async () => {},
      expectedState: "GETTING_VIDEOS_FAILED",
      expectedContext: {
        errorMessage: "Error loading videos",
        videos: [],
        originalVideos: [],
        videoDetails: null,
      },
    },
    {
      name: "should reach ADD_VIDEO_FORM_OPENED state",
      videos: [],
      originalVideos: [],
      eventToSend: { type: "CLICK_NEW_VIDEO_BUTTON" },
      listVideos: async () => [],
      addVideo: async () => {},
      expectedState: "ADD_VIDEO_FORM_OPENED",
      expectedContext: {
        errorMessage: null,
        videos: [],
        originalVideos: [],
        videoDetails: null,
      },
    },
    {
      name: "should reach SEARCHING_VIDEO state",
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
      listVideos: async () => [],
      addVideo: async () => {},
      expectedState: "SEARCHING_VIDEO",
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
      name: "should reach SEARCHING_VIDEO state with no results",
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
      listVideos: async () => [],
      addVideo: async () => {},
      expectedState: "SEARCHING_VIDEO",
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
  ];

  for (const scenerio of scenerios) {
    it(scenerio.name, () => {
      return new Promise<void>((done) => {
        videoManagementMachine.implementations.actors = {
          listVideos: fromPromise<ListVideosOutput>(async () =>
            scenerio.listVideos()
          ),
          addVideo: fromPromise<void>(async () => scenerio.addVideo()),
        };
        const actor = createActor(videoManagementMachine, {
          input: {
            originalVideos: scenerio.originalVideos,
            videos: scenerio.videos,
          },
        });

        actor.subscribe((state) => {
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

  //   test("should load videos", async () => {
  //     const videos: ListVideosOutput = [
  //       { id: 1, description: "Video 1", name: "Video 1", uuid: "123" },
  //     ];

  //     videoManagementMachine.implementations.actors.listVideos =
  //       fromPromise<ListVideosOutput>(async () => videos);

  //     const actor = createActor(videoManagementMachine);
  //     actor.start();
  //     actor.send({ type: "LOAD_VIDEOS_PAGE" });
  //     const context = await matchState(actor, "GETTING_VIDEOS_SUCCESS");
  //     expect(context.videos).toStrictEqual(videos);
  //     expect(context.originalVideos).toStrictEqual(videos);
  //     expect(context.errorMessage).toBeNull();
  //   });

  //   test("should reach GETTING_VIDEOS_FAILED state", async () => {
  //     const errorMessage = "Error loading videos";
  //     videoManagementMachine.implementations.actors.listVideos =
  //       fromPromise<ListVideosOutput>(async () => {
  //         throw new Error(errorMessage);
  //       });

  //     const actor = createActor(videoManagementMachine);
  //     actor.start();
  //     actor.send({ type: "LOAD_VIDEOS_PAGE" });
  //     const context = await matchState(actor, "GETTING_VIDEOS_FAILED");
  //     expect(context.errorMessage).toBe(errorMessage);
  //   });

  //   test("should search videos with valid keyword", async () => {
  //     const videos: ListVideosOutput = [
  //       { id: 1, description: "Video 1", name: "Video 1", uuid: "123" },
  //       { id: 2, description: "Video 2", name: "Video 2", uuid: "456" },
  //       { id: 3, description: "Video", name: "Video", uuid: "789" },
  //     ];

  //     videoManagementMachine.implementations.actors.listVideos =
  //       fromPromise<ListVideosOutput>(async () => videos);

  //     const actor = createActor(videoManagementMachine, {
  //       input: { originalVideos: videos, videos },
  //     });
  //     actor.start();
  //     let isFound = false;
  //     actor.subscribe((state) => {
  //       if (state.matches("SEARCHING_VIDEO")) {
  //         isFound = true;
  //         expect(state.context.videos).toStrictEqual([
  //           { id: 1, description: "Video 1", name: "Video 1", uuid: "123" },
  //           { id: 2, description: "Video 2", name: "Video 2", uuid: "456" },
  //         ]);
  //         expect(state.context.originalVideos).toStrictEqual(videos);
  //       }
  //     });

  //     actor.send({ type: "SEARCH_VIDEO", keyword: "Video " });
  //     expect(isFound).toBe(true);
  //   });
});

//   test("should search videos with valid keyword", () => {
//     const videos: ListVideosOutput = [
//       { id: 1, description: "Video 1", name: "Video 1", uuid: "123" },
//       { id: 2, description: "Video 2", name: "Video 2", uuid: "456" },
//       { id: 3, description: "Video 3", name: "Video 3", uuid: "789" },
//     ];

//     videoManagementMachine.implementations.actors.listVideos =
//       fromPromise<ListVideosOutput>(async () => videos);

//     const actor = createActor(videoManagementMachine);
//     actor.start();

//     actor.send({ type: "SEARCH_VIDEO", keyword: "Video" });
//     actor.subscribe((state) => {
//       if (state.matches("SEARCHING_VIDEO")) {
//         expect(state.context.videos).toStrictEqual([
//           { id: 1, description: "Video 1", name: "Video 1", uuid: "123" },
//           { id: 2, description: "Video 2", name: "Video 2", uuid: "456" },
//         ]);
//         expect(state.context.originalVideos).toStrictEqual(videos);
//       }
//     });
//   });

//   test("should return empty array when no videos match the keyword", () => {
//     const videos: ListVideosOutput = [
//       { id: 1, description: "Video 1", name: "Video 1", uuid: "123" },
//       { id: 2, description: "Video 2", name: "Video 2", uuid: "456" },
//       { id: 3, description: "Video 3", name: "Video 3", uuid: "789" },
//     ];

//     videoManagementMachine.implementations.actors.listVideos =
//       fromPromise<ListVideosOutput>(async () => videos);

//     const actor = createActor(videoManagementMachine);
//     actor.start();

//     actor.send({ type: "SEARCH_VIDEO", keyword: "Video 4" });
//     actor.subscribe((state) => {
//       if (state.matches("SEARCHING_VIDEO")) {
//         expect(state.context.videos).toStrictEqual([]);
//         expect(state.context.originalVideos).toStrictEqual(videos);
//       }
//     });
//   });

//   test("should reach addvideo form", () => {
//     const actor = createActor(videoManagementMachine);
//     actor.start();
//     actor.send({ type: "CLICK_NEW_VIDEO_BUTTON" });
//     actor.subscribe((state) => {
//       if (state.matches("ADD_VIDEO_FORM_OPENED")) {
//         expect(state.context.errorMessage).toBeNull();
//       }
//     });
//   });

//   test("should reach ADDING_VIDEO_SUCCESS state", () => {
//     videoManagementMachine.implementations.actors = {
//       addVideo: fromPromise<void, AddVideoInput>(async () => {}),
//       listVideos: fromPromise<ListVideosOutput>(async () => [
//         {
//           id: 1,
//           description: "Video 1",
//           name: "Video 1",
//           uuid: "123",
//         },
//       ]),
//     };

//     const actor = createActor(videoManagementMachine);

//     actor.start();
//     actor.send({
//       type: "CLICK_ADD_VIDEO",
//       input: {
//         name: "Video 1",
//         description: "Video 1",
//         youtubeURL: "https://www.youtube.com/watch?v=123",
//       },
//     });
//     actor.subscribe((state) => {
//       if (state.matches("ADDING_VIDEO_SUCCESS")) {
//         expect(state.context.videos.length).toBe(1);
//         expect(state.context.errorMessage).toBeNull();
//       }
//     });
//   });

//   test("should reach ADDING_VIDEO_FAILED state", () => {
//     videoManagementMachine.implementations.actors = {
//       addVideo: fromPromise<void, AddVideoInput>(async () => {
//         throw new Error("Error adding video");
//       }),
//       listVideos: fromPromise<ListVideosOutput>(async () => [
//         {
//           id: 1,
//           description: "Video 1",
//           name: "Video 1",
//           uuid: "123",
//         },
//       ]),
//     };

//     const actor = createActor(videoManagementMachine);

//     actor.start();
//     actor.send({
//       type: "CLICK_ADD_VIDEO",
//       input: {
//         name: "Video 1",
//         description: "Video 1",
//         youtubeURL: "https://www.youtube.com/watch?v=123",
//       },
//     });
//     actor.subscribe((state) => {
//       if (state.matches("ADDING_VIDEO_FAILED")) {
//         expect(state.context.errorMessage).toBe("Error adding video");
//       }
//     });
//   });
// });
