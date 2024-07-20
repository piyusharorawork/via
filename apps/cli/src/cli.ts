import { AppRouter } from "@via/server/app-router";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import nodeFetch from "node-fetch";

(async () => {
  try {
    const name = "Hanuman-Ji";
    const description = "Video of lord hanuman also known as bajrang bali";
    const youtubeURL = "https://www.youtube.com/shorts/A4bOUJ9AOEM";
    const start = "00:00:00";
    const end = "00:00:04";

    const trpc = createTRPCProxyClient<AppRouter>({
      links: [
        httpBatchLink({
          url: "http://localhost:4000/trpc",
          fetch: nodeFetch as any,
        }),
      ],
    });

    // ADD ONE VIDEO
    await trpc.addVideo.mutate({ name, youtubeURL, description });

    // // LIST ALL VIDEOS
    // let res = await trpc.listVideos.query({ limit: 10 });
    // console.log(res);

    // // VIEW ONE VIDEO
    // const videoDetails = await trpc.viewVideo.query({
    //   videoUUID: res[0]!.uuid,
    // });
    // console.log(videoDetails);

    // // DELETE THAT VIDEO
    // await trpc.removeVideo.mutate({ videoUUID: res[0]!.uuid });

    // // LIST ALL VIDEOS
    // res = await trpc.listVideos.query({ limit: 10 });
    // console.log(res);
  } catch (error) {
    console.error(error);
  }
})();
