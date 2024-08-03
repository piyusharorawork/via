import { test, vi, expect, describe } from "vitest";
import { recordVideo, VideoBuffer } from "./video-recorder";

test("record video ", async () => {
  await recordVideo();
});

describe("video buffer", () => {
  const scenerios = [
    {
      name: "4 smaller chunks with 1 frame",
      chunks: [[10], [9], [8], [2]],
      width: 1,
      height: 1,
      expectedFrames: [[10, 9, 8, 2]],
    },
    {
      name: "6 chunks with 1 frame",
      chunks: [[10], [9], [8], [2], [1], [1]],
      width: 1,
      height: 1,
      expectedFrames: [[10, 9, 8, 2]],
    },
    {
      name: "10 chunks with 2 frame",
      chunks: [[1], [2], [3], [4], [5], [6], [7], [8], [9], [10]],
      width: 1,
      height: 1,
      expectedFrames: [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
      ],
    },
    {
      name: "1 bigger chunk with 1 frame",
      chunks: [[1, 2, 3, 4]],
      width: 1,
      height: 1,
      expectedFrames: [[1, 2, 3, 4]],
    },
    {
      name: "1 bigger chunk with 2 frames",
      chunks: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]],
      width: 1,
      height: 1,
      expectedFrames: [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
      ],
    },
    {
      name: "1 bigger chunk with 1 frame",
      chunks: [[1, 2, 3, 4, 5, 6]],
      width: 1,
      height: 1,
      expectedFrames: [[1, 2, 3, 4]],
    },
  ];

  for (const scenerio of scenerios) {
    test(scenerio.name, async () => {
      const frames: {
        data: Buffer;
        frameNumber: number;
      }[] = [];

      const onFrame = (frame: Buffer, frameNumber: number) => {
        const copyFrame = Buffer.allocUnsafe(frame.length);
        frame.copy(copyFrame, 0, 0, frame.length);
        frames.push({ data: copyFrame, frameNumber });
      };

      const videoBuffer = new VideoBuffer({
        height: scenerio.height,
        width: scenerio.width,
        onFrame,
      });

      for (const chunk of scenerio.chunks) {
        videoBuffer.addChunk(Buffer.from(chunk));
      }

      expect(frames.length).toBe(scenerio.expectedFrames.length);
      for (let i = 0; i < scenerio.expectedFrames.length; i++) {
        const expectedFrame = scenerio.expectedFrames[i];
        expect(frames[i].data).toStrictEqual(Buffer.from(expectedFrame));
        expect(frames[i].frameNumber).toBe(i + 1);
      }
    });
  }
});
