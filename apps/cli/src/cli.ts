import { uploadFile } from "@via/node-sdk/upload-file";
import { createVideo } from "@via/node-sdk/create-video";
import path from "path";
import { AppRouter } from "@via/server/app-router";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";

(async () => {
  try {
    // const filePath = path.join(path.resolve(), "downloads", "lord-ram-1.mp4");
    // const fileId = await uploadFile(filePath);

    const trpc = createTRPCProxyClient<AppRouter>({
      links: [
        httpBatchLink({
          url: "http://localhost:4000/trpc",
        }),
      ],
    });

    const res = await trpc.getUser.query(10);
    console.log(res);

    // const video = await createVideo();
  } catch (error) {
    console.error(error);
  }
})();
