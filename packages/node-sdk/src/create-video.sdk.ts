import axios from "axios";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "@via/router/router";
// import { AddVideoInput } from "@via/schemas/schema";

export const createVideo = async () => {
  const trpc = createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: "http://localhost:4000/trpc",
      }),
    ],
  });
  const res = await trpc.getUser.query(10);
  return res;
};

// export const addVideo = async (input: AddVideoInput) => {
//   const trpc = createTRPCProxyClient<AppRouter>({
//     links: [
//       httpBatchLink({
//         url: "http://localhost:4000/trpc",
//       }),
//     ],
//   });
//   await trpc.addVideo.mutate(input);
// };
