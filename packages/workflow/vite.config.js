import { defineConfig } from "vitest/config";
import setupFiles from "@via/vitest-config";

export default defineConfig({
  test: {
    environment: "node",
    testTimeout: 20000,
    setupFiles,
  },
});
