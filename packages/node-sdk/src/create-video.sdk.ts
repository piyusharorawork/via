import axios from "axios";

export const createVideo = async () => {
  const res = await axios.get("http://localhost:4000/api/create-video");
  return res.data;
};
