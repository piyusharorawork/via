import axios from "axios";
import fs from "fs";
import FormData from "form-data";

export type UploadVideoOutput = {
  fileURL: string;
};

export const uploadFile = async (
  serverBaseURL: string,
  filePath: string
): Promise<number> => {
  const file = fs.createReadStream(filePath);
  const formData = new FormData();
  formData.append("file", file);
  const res = await axios.post(`${serverBaseURL}/api/upload-file`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      ...formData.getHeaders(),
    },
  });

  return res.data;
};
