import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "../server/public",
    emptyOutDir: true,
  },
  server: {
    proxy: {
      "/chars": {
        target: "http://localhost:3001",
      },
    },
  },
});
