import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "./app-router.js";
import nodeFetch from "node-fetch";

(async () => {
  console.log("client");
  const trpc = createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: "http://localhost:4000/trpc",
        fetch: nodeFetch as any,
      }),
    ],
  });

  const res = await trpc.listVideos.query({ limit: 1 });
  console.log(res);
})();
