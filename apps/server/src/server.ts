// import express from "express";
// import cors from "cors";
// import { useMulter } from "./multer.js";
// import { createVideo } from "./create-video.js";
// import { getUploadFileRouter } from "./routes/upload-file.route.js";

// import * as trpcExpress from "@trpc/server/adapters/express";
// import { appRouter } from "@via/router/router";

// (async () => {
//   try {
//     const createContext = ({
//       req,
//       res,
//     }: trpcExpress.CreateExpressContextOptions) => ({}); // no context
//     type Context = Awaited<ReturnType<typeof createContext>>;
//     // const t = initTRPC.context<Context>().create();
//     // const appRouter = t.router({});

//     const app = express();
//     app.use(cors());
//     app.use(
//       "/trpc",
//       trpcExpress.createExpressMiddleware({ router: appRouter, createContext })
//     );

//     const PORT = process.env.PORT || 4000;

//     app.use("/api/upload-file", getUploadFileRouter(app));

//     // app.use("/api/create-video", createVideoRouter);

//     // app.post("/create-video", upload.single("file"), async (req, res) => {
//     //   // TODO need type safey req body
//     //   if (req.file) {
//     //     const url = await createVideo({
//     //       duration: Number(req.body.duration),
//     //       file: req.file,
//     //       resolution: req.body.resolution,
//     //       text: req.body.text,
//     //       bottomMargin: Number(req.body.bottomMargin),
//     //       fontSize: Number(req.body.fontSize),
//     //       textColor: req.body.textColor,
//     //       masterVolume: Number(req.body.masterVolume),
//     //     });
//     //     res.json({
//     //       success: true,
//     //       message: "File uploaded successfully",
//     //       file: req.file,
//     //       url,
//     //     });
//     //   } else {
//     //     res.status(400).json({
//     //       success: false,
//     //       message: "No file uploaded",
//     //     });
//     //   }
//     // });

//     app.listen(PORT, () => {
//       console.log(`Server running on port ...${PORT}`);
//     });
//   } catch (error) {
//     console.error(error);
//   }
// })();

import { config } from "dotenv";
import { Application } from "./app.js";

(async () => {
  try {
    config();

    const databaseName = process.env.DATABASE_NAME;
    if (!databaseName) {
      throw "no DATABASE_NAME name in env";
    }

    const port = process.env.PORT;
    if (!port) {
      throw "no PORT in env";
    }

    const token = process.env.OLLAMA_TOKEN;
    if (!token) {
      throw "no OLLAMA_TOKEN in env";
    }

    const finderURL = process.env.FINDER_URL;
    if (!finderURL) {
      throw "no FINDER_URL in env";
    }

    const app = new Application({
      databaseName,
      finderURL,
      port: parseInt(port),
      token,
    });

    await app.start();
  } catch (error) {
    console.error(error);
  }
})();

// import { initTRPC } from "@trpc/server";
// import { z } from "zod";
// import express from "express";
// import * as trpcExpress from "@trpc/server/adapters/express";

// export const t = initTRPC.create();

// export const appRouter = t.router({
//   hello: t.procedure.input(z.string()).query(({ input }) => {
//     return `Hello ${input}`;
//   }),
// });

// export type AppRouter = typeof appRouter;

// (async () => {
//   const app = express();
//   app.use(
//     "/trpc",
//     trpcExpress.createExpressMiddleware({
//       router: appRouter,
//     })
//   );

//   app.listen(4000, () => {
//     console.log("running at 4000");
//   });
// })();
