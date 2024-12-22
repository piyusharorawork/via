import type { Config } from "tailwindcss";

const config: Omit<Config, "content"> = {
  theme: {
    extend: {
      backgroundImage: {},
    },
  },
  plugins: [],
};

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [config],
} satisfies Pick<Config, "prefix" | "presets" | "content">;
