import { defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig(({ mode }) => {
  return {
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/setupTests.js",
      exclude: ["**/e2e/**", "**/*.e2e.spec.js", "**/node_modules/**"],
    },
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, "index.html"),
          hash: resolve(__dirname, "index.hash.html"),
        },
      },
    },
    base: mode === "production" ? "/front_5th_chapter1-1/" : "/",
  };
});
