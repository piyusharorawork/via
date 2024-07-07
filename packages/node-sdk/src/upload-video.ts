import axios from "axios";
import fs from "fs";
import FormData from "form-data";

export type UploadVideoOutput = {
  fileURL: string;
};

export const uploadVideo = async (filePath: string): Promise<string> => {
  const file = fs.createReadStream(filePath);
  const formData = new FormData();
  formData.append("file", file);
  const res = await axios.post(
    "http://localhost:4000/api/upload-video",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        ...formData.getHeaders(),
      },
    }
  );

  return res.data;
};
