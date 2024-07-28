import { AppRouter } from "@via/server/app-router";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import nodeFetch from "node-fetch";

import { getVideoManagementActor } from "@via/machine/video-management-machine";
import { downloadYoutubeVideo } from "@via/core/video-downloader";
import { resizeVideo } from "@via/core/video-resizer";
import { generateVideo } from "@via/core/generate-video";

(async () => {
  try {
    const trpc = createTRPCProxyClient<AppRouter>({
      links: [
        httpBatchLink({
          url: "http://localhost:4000/trpc",
          fetch: nodeFetch as any,
        }),
      ],
    });

    const res = await trpc.listVideos.query({ limit: 10 });
    console.log(res);

    // await downloadYoutubeVideo(
    //   "https://www.youtube.com/shorts/Gm7OIGrOqNk",
    //   "downloads/10-sec-count-down.mp4"
    // );

    // await resizeVideo(
    //   "downloads/5-sec-black.mp4",
    //   540,
    //   960,
    //   "downloads/5-sec-video.mp4"
    // );

    // await generateVideo({
    //   generatedVideoPath:
    //     "/Users/piyusharora/projects/via/apps/cli/exports/generated.mp4",
    //   quote: "HELLO",
    //   videoPath: "/Users/piyusharora/projects/via/apps/cli/assets/river.mp4",
    // });
  } catch (error) {
    console.error(error);
  }
})();
