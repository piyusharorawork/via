import type { Config } from "tailwindcss";
import daisyui from "daisyui";

// We want each package to be responsible for its own content.
const config: Omit<Config, "content"> = {
  theme: {
    extend: {
      backgroundImage: {},
    },
  },
  plugins: [daisyui],
};
export default config;
