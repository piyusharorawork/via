import { expect, test } from "vitest";
import { subtract } from "./subtract";

test("adds 1 - 2 to equal -1", () => {
  expect(subtract(1, 2)).toBe(-1);
});
