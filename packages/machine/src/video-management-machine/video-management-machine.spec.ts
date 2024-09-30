import { describe, test, expect, vi, Assertion } from "vitest";
import { getVideoManagementMachine } from "./video-management-machine.js";
import { ActorRefFrom, createActor, fromPromise, StateFrom } from "xstate";
import { AddVideoInput, ListVideosOutput } from "@via/core/video-manager";

describe("video-management-machine", () => {
  const fetchMock = vi.fn();
  const videoManagementMachine = getVideoManagementMachine(fetchMock);

  const matchState = (
    actor: ActorRefFrom<typeof videoManagementMachine>,
    state: StateFrom<typeof videoManagementMachine>["value"],
    callback: (
      context: StateFrom<typeof videoManagementMachine>["context"]
    ) => void
  ) => {
    return new Promise<void>((resolve) => {
      actor.subscribe((s) => {
        console.log(s.value);
        if (s.matches(state)) {
          callback(s.context);
          resolve();
        }
      });
    });
  };

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

  test("should search videos with valid keyword", async () => {
    const videos: ListVideosOutput = [
      { id: 1, description: "Video 1", name: "Video 1", uuid: "123" },
      { id: 2, description: "Video 2", name: "Video 2", uuid: "456" },
      { id: 3, description: "Video", name: "Video", uuid: "789" },
    ];

    videoManagementMachine.implementations.actors.listVideos =
      fromPromise<ListVideosOutput>(async () => videos);

    const actor = createActor(videoManagementMachine, {
      input: { originalVideos: videos, videos },
    });
    actor.start();
    // actor.send({ type: "LOAD_VIDEOS_PAGE" });
    await matchState(actor, "SEARCHING_VIDEO", (context) => {
      expect(context.videos).toStrictEqual([
        { id: 1, description: "Video 1", name: "Video 1", uuid: "123" },
        { id: 2, description: "Video 2", name: "Video 2", uuid: "456" },
      ]);
    });

    actor.send({ type: "SEARCH_VIDEO", keyword: "Video " });

    // expect(context.videos).toStrictEqual([
    //   { id: 1, description: "Video 1", name: "Video 1", uuid: "123" },
    //   { id: 2, description: "Video 2", name: "Video 2", uuid: "456" },
    // ]);
    // expect(context.originalVideos).toStrictEqual(videos);
    // expect(context.errorMessage).toBeNull();
  });
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
