import axios from "axios";
import fs from "fs";
import FormData from "form-data";

export type UploadVideoOutput = {
  fileURL: string;
};

export const uploadFile = (serverBaseURL: string, filePath: string) => {
  return new Promise<number>(async (resolve, reject) => {
    try {
      const file = fs.createReadStream(filePath);
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post(
        `${serverBaseURL}/api/upload-file`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            ...formData.getHeaders(),
          },
        }
      );

      resolve(res.data);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
