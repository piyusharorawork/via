import axios from "axios";
import fs from "fs";
import FormData from "form-data";

export type UploadVideoOutput = {
  originalname: string;
  mimetype: string;
  filename: string;
  path: string;
  size: string;
  destination: string;
};

export class FileUploader {
  private serverBaseURL: string;
  constructor(serverBaseURL: string) {
    this.serverBaseURL = serverBaseURL;
  }

  async uploadFile(filePath: string): Promise<UploadVideoOutput> {
    try {
      const file = fs.createReadStream(filePath);
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post(
        `${this.serverBaseURL}/api/upload-file`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            ...formData.getHeaders(),
          },
        }
      );

      return res.data;
    } catch (error) {
      throw error;
    }
  }
}

export const uploadFile = (serverBaseURL: string, filePath: string) => {
  return new Promise<UploadVideoOutput>(async (resolve, reject) => {
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
