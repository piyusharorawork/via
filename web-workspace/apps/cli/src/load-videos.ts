import { AppRouter } from "@via/server/app-router";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import nodeFetch from "node-fetch";

(async () => {
  try {
    console.log("loading videos ...");

    const videos = [
      {
        name: "durga",
        description:
          "Video of Durga Mata depicting her fierce and protective nature in traditional Indian rituals and celebrations.",
        youtubeURL: "https://www.youtube.com/shorts/qzok18OdEMs",
      },
      {
        name: "shiva",
        description:
          "Video of Lord Shiva showcasing his divine dance (Tandava) and powerful presence in traditional Indian worship.",
        youtubeURL: "https://www.youtube.com/shorts/wLIF4xhsUPw",
      },
      {
        name: "hanuman",
        description:
          "Video of Lord Hanuman demonstrating his devotion and strength through traditional Indian worship and rituals.",
        youtubeURL: "https://www.youtube.com/shorts/qJHdKMXPFOM",
      },
      {
        name: "ganesha",
        description:
          "Video of Lord Ganesha highlighting his wisdom and auspicious presence in traditional Indian ceremonies and festivals.",
        youtubeURL: "https://www.youtube.com/shorts/052bRN_ZrxU",
      },
      {
        name: "ram",
        description:
          "Video of Lord Ram portraying his righteous and noble character in traditional Indian worship and epic storytelling.",
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

    for (let i = 0; i < videos.length; i++) {
      console.log(`video ${i + 1} of ${videos.length}`);
      const video = videos[i];
      await trpc.addVideo.mutate({ ...video! });
    }

    console.log("loading successful !!!");
  } catch (error) {
    console.error(error);
  }
})();
