import { test } from "vitest";
import { recordVideo } from "./video-recorder";

test("record video ", async () => {
  await recordVideo();
});
