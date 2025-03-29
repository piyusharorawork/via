import { join } from "path";

export const getBinPath = () => {
  return join(__dirname, "..", "..", "bin");
};
