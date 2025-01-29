import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import dts from "vite-plugin-dts";
import path from 'node:path'

export default defineConfig(({ mode }) => {
  if (mode === "dev") {
    // 🔹 Modo para desarrollo y pruebas
    return {
      plugins: [react(), tailwindcss()],
      server: {
        port: 3000,
      },
      build: {
        outDir: "dist",
        rollupOptions: {
          input: "src/dev.tsx",
        },
      },
      resolve: {
        alias: {
          "@": path.resolve(__dirname, './src'),
        },
      },
    };
  } else {
    // 🔹 Configuración para build del SDK
    return {
      plugins: [react(), tailwindcss(), dts({ insertTypesEntry: true })],
      build: {
        lib: {
          entry: "src/index.ts",
          name: "BitcoinWalletSDK",
          formats: ["es", "cjs"],
          fileName: (format) => `bitcoin-wallet-sdk.${format}.js`,
        },
        rollupOptions: {
          external: ["react", "react-dom"],
        },
      },
      resolve: {
        alias: {
          "@": path.resolve(__dirname, './src'),
        },
      },
    };
  }
});
