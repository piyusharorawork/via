import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import cors from "cors";
import { createRouter } from "./router.js";
import { getUploadFileRouter } from "./routes/upload-file.route.js";
import { Server, IncomingMessage, ServerResponse } from "http";
import { createRouteHandler } from "uploadthing/express";
import { uploadRouter } from "./upload-thing.js";

type ApplicationConfig = {
  databaseName: string;
  port: number;
  finderURL: string;
  token: string;
  model: string;
};

export class Application {
  private databaseName: string;
  private port: number;
  private finderURL: string;
  private token: string;
  private model: string;

  constructor(config: ApplicationConfig) {
    this.databaseName = config.databaseName;
    this.port = config.port;
    this.finderURL = config.finderURL;
    this.token = config.token;
    this.model = config.model;
  }

  private server: Server<typeof IncomingMessage, typeof ServerResponse> | null =
    null;

  start() {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const serverBaseURL = `http://localhost:${this.port}`;

        const createContext = ({
          req,
          res,
        }: trpcExpress.CreateExpressContextOptions) => ({}); // no context
        type Context = Awaited<ReturnType<typeof createContext>>;
        const app = express();
        app.use(cors());

        const appRouter = createRouter(
          this.databaseName,
          serverBaseURL,
          this.finderURL,
          this.token,
          this.model
        );

        app.use(
          "/trpc",
          trpcExpress.createExpressMiddleware({
            router: appRouter,
            createContext,
          })
        );

        app.use(
          "/api/uploadthing",
          createRouteHandler({
            router: uploadRouter,
            config: {},
          })
        );

        app.get("/", (_, res) => {
          res.json("server running");
        });
        app.use("/api/upload-file", getUploadFileRouter(app));
        this.server = app.listen(this.port, () => {
          console.log(`Server running on port ...${this.port}`);
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
