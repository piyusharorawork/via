import { expect, test, describe } from "vitest";
import { Application } from "../app.js";
import fs from "fs";
import { uploadFile } from "@via/node-sdk/upload-file";

describe("upload file route", () => {
  test("upload small text file", async () => {
    const app = new Application();
    await app.start();

    // TODO these can be moved to a utility method

    const isTempDirExist = fs.existsSync("temp");

    if (!isTempDirExist) {
      fs.mkdirSync("temp");
    }

    const filePath = "temp/sample.txt";
    const isFileExist = fs.existsSync(filePath);

    if (!isFileExist) {
      fs.writeFileSync(filePath, "sample");
    }

    const serverBaseURL = `http://localhost:${process.env.PORT}`;
    const file = await uploadFile(serverBaseURL, filePath);

    expect(file.originalname).toBe("sample.txt");
    expect(file.mimetype).toBe("text/plain");
    expect(file.originalname).toBe("sample.txt");
    expect(file.path).toContain("uploads");
    expect(file.size).toBe(6);
    expect(file.destination).toBe("uploads/");

    await app.stop();
  });
});
