import { StateCreator } from "zustand";
import { State } from "./store";

export type TransitionSlice = {
  transitions: Transition[];
};

export type Transition = {
  start: number;
  end: number;
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
      end: 27,
      info: {
        type: "layout",
        grid: { columns: 1, rows: 1 },
        content: [{ row: 0, column: 0, kind: "video" }],
      },
    },
    {
      start: 28,
      end: 57,
      info: {
        type: "layout",
        grid: { rows: 0, columns: 0 },
        content: [],
      },
    },
    {
      start: 58,
      end: 61,
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
      end: 63,
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
      end: 66,
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
      end: 69,
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
      end: 72,
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
      end: 75,
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
      end: 78,
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
      end: 81,
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
      end: 84,
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
      end: 87,
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
      end: 90,
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
      end: 93,
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
      end: 96,
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
      end: 99,
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
      end: 102,
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
      end: 105,
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
      end: 108,
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
      end: 126,
      info: {
        type: "layout",
        grid: { columns: 1, rows: 1 },
        content: [{ row: 0, column: 0, kind: "video" }],
      },
    },
    {
      start: 127,
      end: 172,
      info: {
        type: "layout",
        grid: { columns: 1, rows: 1 },
        content: [{ row: 0, column: 0, kind: "video" }],
      },
    },
    {
      start: 173,
      end: 183,
      info: {
        type: "dissolve",
      },
    },
    {
      start: 184,
      end: 218,
      info: {
        type: "layout",
        grid: { columns: 1, rows: 1 },
        content: [{ row: 0, column: 0, kind: "video" }],
      },
    },
    {
      start: 219,
      end: 233,
      info: {
        type: "layout",
        grid: { columns: 1, rows: 1 },
        content: [{ row: 0, column: 0, kind: "video" }],
      },
    },
    {
      start: 234,
      end: 246,
      info: {
        type: "layout",
        grid: { columns: 1, rows: 1 },
        content: [{ row: 0, column: 0, kind: "video" }],
      },
    },
    {
      start: 247,
      end: 258,
      info: {
        type: "layout",
        grid: { columns: 1, rows: 1 },
        content: [{ row: 0, column: 0, kind: "video" }],
      },
    },
    {
      start: 259,
      end: 272,
      info: {
        type: "layout",
        grid: { columns: 1, rows: 1 },
        content: [{ row: 0, column: 0, kind: "video" }],
      },
    },
    {
      start: 273,
      end: 285,
      info: {
        type: "layout",
        grid: { columns: 1, rows: 1 },
        content: [{ row: 0, column: 0, kind: "video" }],
      },
    },
    {
      start: 286,
      end: 299,
      info: {
        type: "layout",
        grid: { columns: 1, rows: 1 },
        content: [{ row: 0, column: 0, kind: "video" }],
      },
    },
    {
      start: 300,
      end: 312,
      info: {
        type: "layout",
        grid: { columns: 1, rows: 1 },
        content: [{ row: 0, column: 0, kind: "video" }],
      },
    },
    {
      start: 313,
      end: 326,
      info: {
        type: "layout",
        grid: { columns: 1, rows: 1 },
        content: [{ row: 0, column: 0, kind: "video" }],
      },
    },
    {
      start: 327,
      end: 341,
      info: {
        type: "layout",
        grid: { rows: 3, columns: 1 },
        content: [{ row: 0, column: 0, kind: "image" }],
      },
    },
    {
      start: 342,
      end: 353,
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
      end: 363,
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
      end: 378,
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
      end: 392,
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
      start: 393,
      end: 422,
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
