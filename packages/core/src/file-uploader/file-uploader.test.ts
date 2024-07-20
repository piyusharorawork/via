import { describe, test, expect } from "vitest";
import { FileUploader } from "./file-uploader";
import fs from "fs";

describe("file uploader", async () => {
  const scenerios = [
    {
      name: "upload text file",
    },
  ];

  // TODO try to see server can also be invoked
  const serverBaseURL = "http://localhost:4000";
  const fileUploader = new FileUploader(serverBaseURL);

  const isTempDirExist = fs.existsSync("temp");

  if (!isTempDirExist) {
    fs.mkdirSync("temp");
  }

  const filePath = "temp/sample.txt";
  const isFileExist = fs.existsSync(filePath);

  if (!isFileExist) {
    fs.writeFileSync(filePath, "sample");
  }

  for (const scenerio of scenerios) {
    test(scenerio.name, async () => {
      const file = await fileUploader.uploadFile(filePath);
      expect(file.originalname).toBe("sample.txt");
      expect(file.mimetype).toBe("text/plain");
      expect(file.originalname).toBe("sample.txt");
      expect(file.path).toContain("uploads");
      expect(file.size).toBe(6);
      expect(file.destination).toBe("uploads/");
    });
  }
});
