import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import cors from "cors";
import { appRouter } from "./router.js";
import { getUploadFileRouter } from "./routes/upload-file.route.js";
import { Server, IncomingMessage, ServerResponse } from "http";

export class Application {
  private server: Server<typeof IncomingMessage, typeof ServerResponse> | null =
    null;

  start() {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const createContext = ({
          req,
          res,
        }: trpcExpress.CreateExpressContextOptions) => ({}); // no context
        type Context = Awaited<ReturnType<typeof createContext>>;
        const app = express();
        app.use(cors());
        app.use(
          "/trpc",
          trpcExpress.createExpressMiddleware({
            router: appRouter,
            createContext,
          })
        );
        const PORT = process.env.PORT;
        app.get("/", (_, res) => {
          res.json("server running");
        });
        app.use("/api/upload-file", getUploadFileRouter(app));
        this.server = app.listen(PORT, () => {
          console.log(`Server running on port ...${PORT}`);
          resolve();
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  stop() {
    return new Promise<void>(async (resolve, reject) => {
      try {
        if (this.server == null) {
          return resolve();
        }

        this.server.close(() => {
          resolve();
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}
