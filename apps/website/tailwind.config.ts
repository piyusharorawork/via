import type { Config } from "tailwindcss";
import sharedConfig from "@via/tailwind-config";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [sharedConfig],
} satisfies Pick<Config, "prefix" | "presets" | "content">;
