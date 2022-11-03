import { defineConfig } from "vite";

export default defineConfig({
  root: "www/",
  publicDir: "../public/",
  build: {
    outDir: "../dist",
  },
});
