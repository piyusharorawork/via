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
