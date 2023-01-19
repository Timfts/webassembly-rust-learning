import { defineConfig } from "vite";

export default defineConfig({
  root: "www/",
  base: "/webassembly-rust-learning/",
  publicDir: "../public/",
  build: {
    outDir: "../dist",
  },
});
