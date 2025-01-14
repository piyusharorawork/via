import { StateCreator } from "zustand";
import { State } from "./store";

export type TransitionSlice = {
  transitions: Transition[];
};

export type Transition = {
  start: number;
  info: TransitionInfo;
};

type LayoutGrid = {
  rows: number;
  columns: number;
};

type LayoutContent = {
  row: number;
  column: number;
  kind: "video" | "image";
};

type TransitionInfo =
  | {
      type: "dissolve";
    }
  | {
      type: "layout";
      grid: LayoutGrid;
      content: LayoutContent[];
    };

export const useTransitionStore: StateCreator<
  State,
  [],
  [],
  TransitionSlice
> = (_set) => ({
  transitions: [
    {
      start: 1,
      info: {
        type: "layout",
        grid: { columns: 1, rows: 1 },
        content: [{ row: 0, column: 0, kind: "video" }],
      },
    },
    {
      start: 28,
      info: {
        type: "layout",
        grid: { rows: 0, columns: 0 },
        content: [],
      },
    },
    {
      start: 58,
      info: {
        type: "layout",
        grid: {
          rows: 1,
          columns: 1,
        },
        content: [{ row: 0, column: 0, kind: "image" }],
      },
    },
    {
      start: 62,
      info: {
        type: "layout",
        grid: {
          rows: 1,
          columns: 1,
        },
        content: [{ row: 0, column: 0, kind: "image" }],
      },
    },
    {
      start: 64,
      info: {
        type: "layout",
        grid: {
          rows: 1,
          columns: 1,
        },
        content: [{ row: 0, column: 0, kind: "image" }],
      },
    },
    {
      start: 67,
      info: {
        type: "layout",
        grid: {
          rows: 1,
          columns: 1,
        },
        content: [{ row: 0, column: 0, kind: "image" }],
      },
    },
    {
      start: 70,
      info: {
        type: "layout",
        grid: {
          rows: 1,
          columns: 1,
        },
        content: [{ row: 0, column: 0, kind: "image" }],
      },
    },
    {
      start: 73,
      info: {
        type: "layout",
        grid: {
          rows: 1,
          columns: 1,
        },
        content: [{ row: 0, column: 0, kind: "image" }],
      },
    },
    {
      start: 76,
      info: {
        type: "layout",
        grid: {
          rows: 1,
          columns: 1,
        },
        content: [{ row: 0, column: 0, kind: "image" }],
      },
    },
    {
      start: 79,
      info: {
        type: "layout",
        grid: {
          rows: 1,
          columns: 1,
        },
        content: [{ row: 0, column: 0, kind: "image" }],
      },
    },
    {
      start: 82,
      info: {
        type: "layout",
        grid: {
          rows: 1,
          columns: 1,
        },
        content: [{ row: 0, column: 0, kind: "image" }],
      },
    },
    {
      start: 85,
      info: {
        type: "layout",
        grid: {
          rows: 1,
          columns: 1,
        },
        content: [{ row: 0, column: 0, kind: "image" }],
      },
    },
    {
      start: 88,
      info: {
        type: "layout",
        grid: {
          rows: 1,
          columns: 1,
        },
        content: [{ row: 0, column: 0, kind: "image" }],
      },
    },
    {
      start: 91,
      info: {
        type: "layout",
        grid: {
          rows: 1,
          columns: 1,
        },
        content: [{ row: 0, column: 0, kind: "image" }],
      },
    },
    {
      start: 94,
      info: {
        type: "layout",
        grid: {
          rows: 1,
          columns: 1,
        },
        content: [{ row: 0, column: 0, kind: "image" }],
      },
    },
    {
      start: 97,
      info: {
        type: "layout",
        grid: {
          rows: 1,
          columns: 1,
        },
        content: [{ row: 0, column: 0, kind: "image" }],
      },
    },
    {
      start: 100,
      info: {
        type: "layout",
        grid: {
          rows: 1,
          columns: 1,
        },
        content: [{ row: 0, column: 0, kind: "image" }],
      },
    },
    {
      start: 103,
      info: {
        type: "layout",
        grid: {
          rows: 1,
          columns: 1,
        },
        content: [{ row: 0, column: 0, kind: "image" }],
      },
    },
    {
      start: 106,
      info: {
        type: "layout",
        grid: {
          rows: 1,
          columns: 1,
        },
        content: [{ row: 0, column: 0, kind: "image" }],
      },
    },
    {
      start: 109,
      info: {
        type: "layout",
        grid: { columns: 1, rows: 1 },
        content: [{ row: 0, column: 0, kind: "video" }],
      },
    },
    {
      start: 127,
      info: {
        type: "layout",
        grid: { columns: 1, rows: 1 },
        content: [{ row: 0, column: 0, kind: "video" }],
      },
    },
    {
      start: 173,
      info: {
        type: "dissolve",
      },
    },
    {
      start: 184,
      info: {
        type: "layout",
        grid: { columns: 1, rows: 1 },
        content: [{ row: 0, column: 0, kind: "video" }],
      },
    },
    {
      start: 219,
      info: {
        type: "layout",
        grid: { columns: 1, rows: 1 },
        content: [{ row: 0, column: 0, kind: "video" }],
      },
    },
    {
      start: 234,
      info: {
        type: "layout",
        grid: { columns: 1, rows: 1 },
        content: [{ row: 0, column: 0, kind: "video" }],
      },
    },
    {
      start: 247,
      info: {
        type: "layout",
        grid: { columns: 1, rows: 1 },
        content: [{ row: 0, column: 0, kind: "video" }],
      },
    },
    {
      start: 259,
      info: {
        type: "layout",
        grid: { columns: 1, rows: 1 },
        content: [{ row: 0, column: 0, kind: "video" }],
      },
    },
    {
      start: 273,
      info: {
        type: "layout",
        grid: { columns: 1, rows: 1 },
        content: [{ row: 0, column: 0, kind: "video" }],
      },
    },
    {
      start: 286,
      info: {
        type: "layout",
        grid: { columns: 1, rows: 1 },
        content: [{ row: 0, column: 0, kind: "video" }],
      },
    },
    {
      start: 300,
      info: {
        type: "layout",
        grid: { columns: 1, rows: 1 },
        content: [{ row: 0, column: 0, kind: "video" }],
      },
    },
    {
      start: 313,
      info: {
        type: "layout",
        grid: { columns: 1, rows: 1 },
        content: [{ row: 0, column: 0, kind: "video" }],
      },
    },
    {
      start: 327,
      info: {
        type: "layout",
        grid: { rows: 3, columns: 1 },
        content: [{ row: 0, column: 0, kind: "image" }],
      },
    },
    {
      start: 342,
      info: {
        type: "layout",
        grid: { rows: 3, columns: 1 },
        content: [
          { row: 0, column: 0, kind: "image" },
          { row: 1, column: 0, kind: "image" },
        ],
      },
    },
    {
      start: 354,
      info: {
        type: "layout",
        grid: { rows: 3, columns: 1 },
        content: [
          { row: 0, column: 0, kind: "image" },
          { row: 1, column: 0, kind: "image" },
          { row: 2, column: 0, kind: "image" },
        ],
      },
    },
    {
      start: 364,
      info: {
        type: "layout",
        grid: { rows: 3, columns: 1 },
        content: [
          { row: 0, column: 0, kind: "video" },
          { row: 1, column: 0, kind: "image" },
          { row: 2, column: 0, kind: "image" },
        ],
      },
    },
    {
      start: 379,
      info: {
        type: "layout",
        grid: { rows: 3, columns: 1 },
        content: [
          { row: 0, column: 0, kind: "video" },
          { row: 1, column: 0, kind: "video" },
          { row: 2, column: 0, kind: "image" },
        ],
      },
    },
    {
      start: 93,
      info: {
        type: "layout",
        grid: { rows: 3, columns: 1 },
        content: [
          { row: 0, column: 0, kind: "video" },
          { row: 1, column: 0, kind: "video" },
          { row: 2, column: 0, kind: "video" },
        ],
      },
    },
  ],
});
