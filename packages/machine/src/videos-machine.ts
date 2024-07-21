import { assign, createActor, createMachine, setup } from "xstate";

// const countMachine = setup({
//   types: {
//     context: {} as { count: number },
//     events: {} as
//       | { type: "INC" }
//       | { type: "DEC" }
//       | { type: "SET"; value: number },
//   },
//   actions: {},
// }).createMachine({
//   /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAYgEkA5AYQG0AGAXUVAAcB7WXAF1zf2ZAAPRACYA7ADoAHGKkBOOgDY6YsXSkAWDQFYANCACeouiInaAjHQ10AzJrHaRc81IC+r-Wix5CpACIAorSMAuycPHwCwgji0rIKyqrqWnqGiJaSItqOdOZyIjZiijpy7p4YOATEJADKAQAq9ExIIGHcvPwt0bEy8koqapo6+kYI5iLuHiD4bBBwAl6VvqEc7ZFd6WIjiDYmEkXaytqq43J2k65AA */
//   context: {
//     count: 0,
//   },
//   on: {
//     INC: {
//       actions: assign({
//         count: ({ context }) => context.count + 1,
//       }),
//     },
//     DEC: {
//       actions: assign({
//         count: ({ context }) => context.count - 1,
//       }),
//     },
//     SET: {
//       actions: assign({
//         count: ({ event }) => event.value,
//       }),
//     },
//   },
// });

// export const countActore = createActor(countMachine);

const countMachine = setup({
  types: {
    context: {} as { count: number },
    events: {} as
      | { type: "INC" }
      | { type: "DEC" }
      | { type: "SET"; value: number },
  },
}).createMachine({
  context: {
    count: 0,
  },
  on: {
    INC: {
      actions: assign({
        count: ({ context }) => context.count + 1,
      }),
    },
    DEC: {
      actions: assign({
        count: ({ context }) => context.count - 1,
      }),
    },
    SET: {
      actions: assign({
        count: ({ event }) => event.value,
      }),
    },
  },
});

export const countActor = createActor(countMachine).start();
