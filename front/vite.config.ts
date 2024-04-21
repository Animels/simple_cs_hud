import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import { resolve } from "node:path";
export default defineConfig({
  resolve: {
    alias: [{ find: "~", replacement: resolve(__dirname, "./src") }],
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
    },
  },
  plugins: [solid()],
  server: {
    watch: {
      usePolling: true,
    },
  },
});
