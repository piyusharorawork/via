import type { Config } from "tailwindcss";

const config: Omit<Config, "content"> = {
  theme: {
    extend: {
      backgroundImage: {},
      screens: {
        "3xl": "1920px",
        "4xl": "2560px",
      },
    },
  },
  plugins: [],
};

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [config],
} satisfies Pick<Config, "prefix" | "presets" | "content">;
