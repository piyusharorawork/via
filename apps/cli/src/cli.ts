import { AppRouter } from "@via/server/app-router";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";

(async () => {
  try {
    const name = "Hanuman Ji";
    const description = "Video of lord hanuman also known as bajrang bali";
    const youtubeURL = "https://www.youtube.com/shorts/A4bOUJ9AOEM";
    const start = "00:00:00";
    const end = "00:00:04";

    const trpc = createTRPCProxyClient<AppRouter>({
      links: [
        httpBatchLink({
          url: "http://localhost:4000",
        }),
      ],
    });

    const res = await trpc.listVideos.query({ limit: 10 });
    console.log(res);

    //await addVideo({ uuid, description, name, youtubeURL });

    // await downloadYoutubeVideo({
    //   dirPath: "downloads",
    //   end,
    //   start,
    //   url: youtubeURL,
    //   fileName: "hanuman.mp4",
    // });

    // const filePath = "downloads/hanuman.mp4";
    // const fileId = await uploadFile(filePath);
    // await addVideo({ description, name, fileId });

    // const videoStore = createVideoStore("sqlite.db");
    // const videos = await videoStore.list();

    // console.log(videos);
  } catch (error) {
    console.error(error);
  }
})();
