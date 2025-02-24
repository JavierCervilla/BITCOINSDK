import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import dts from "vite-plugin-dts";
import path from 'node:path';

export default defineConfig(({ mode: _mode }) => {
  return {
    plugins: [react(), tailwindcss(), dts({ insertTypesEntry: true })],
    css: {
      postcss: "./postcss.config.js",
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@styles": path.resolve(__dirname, "./styles"),
      },
    },
  };
});
