import { describe, test, expect } from "vitest";
import { FileUploader } from "./file-uploader";
import fs from "fs";
import { getSampleVideoFilePath } from "@via/common/path";

describe("file uploader", async () => {
  const scenerios = [
    {
      name: "upload video file",
    },
  ];

  // TODO try to see server can also be invoked
  const serverBaseURL = "http://localhost:4000";
  const fileUploader = new FileUploader(serverBaseURL);

  // const isTempDirExist = fs.existsSync("temp");

  // if (!isTempDirExist) {
  //   fs.mkdirSync("temp");
  // }

  const filePath = getSampleVideoFilePath("1-sec.mp4");
  const isFileExist = fs.existsSync(filePath);

  if (!isFileExist) {
    fs.writeFileSync(filePath, "sample");
  }

  for (const scenerio of scenerios) {
    test(scenerio.name, async () => {
      const file = await fileUploader.uploadFile(filePath);
      expect(file.originalname).toBe("1-sec.mp4");
      expect(file.mimetype).toBe("video/mp4");
      expect(file.size).toBe(22170);
    });
  }
});
