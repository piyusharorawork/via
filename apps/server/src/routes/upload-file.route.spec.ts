import { expect, test, describe } from "vitest";
import { Application } from "../app.js";
import fs from "fs";
import { uploadFile } from "@via/node-sdk/upload-file";

describe("upload file route", () => {
  test("upload small text file", async () => {
    const app = new Application();
    await app.start();

    const filePath = "temp/sample.txt";
    const isFileExist = fs.existsSync(filePath);

    if (!isFileExist) {
      fs.writeFileSync(filePath, "sample");
    }

    const serverBaseURL = `http://localhost:${process.env.PORT}`;
    const fileId = await uploadFile(serverBaseURL, filePath);

    expect(fileId).toBeGreaterThan(0);

    await app.stop();
  });
});
