import { AppRouter } from "@via/server/app-router";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import nodeFetch from "node-fetch";

(async () => {
  try {
    console.log("loading videos ...");

    const videos = [
      {
        name: "durga",
        description: "Jai maa durga",
        youtubeURL: "https://www.youtube.com/shorts/qzok18OdEMs",
      },
      {
        name: "shiva",
        description: "Har har maha dev",
        youtubeURL: "https://www.youtube.com/shorts/wLIF4xhsUPw",
      },
      {
        name: "hanuman",
        description: "Jai bajrang bali",
        youtubeURL: "https://www.youtube.com/shorts/qJHdKMXPFOM",
      },
      {
        name: "ganesha",
        description: "gan pati bappa morya",
        youtubeURL: "https://www.youtube.com/shorts/052bRN_ZrxU",
      },
      {
        name: "ram",
        description: "jai shree ram",
        youtubeURL: "https://www.youtube.com/shorts/qSiA4IBmnZc",
      },
    ];

    const trpc = createTRPCProxyClient<AppRouter>({
      links: [
        httpBatchLink({
          url: "http://localhost:4000/trpc",
          fetch: nodeFetch as any,
        }),
      ],
    });

    for (const video of videos) {
      await trpc.addVideo.mutate({ ...video });
    }

    console.log("loading successful !!!");
  } catch (error) {
    console.error(error);
  }
})();
