import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "@via/server/app-router";

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:4000/trpc",
    }),
  ],
});
