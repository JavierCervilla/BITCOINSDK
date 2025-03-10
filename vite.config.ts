import { defineConfig } from "vite";
import path from "node:path";

export default defineConfig({
  root: "src/ui", // Establece el directorio raíz en `src/ui`
  publicDir: "public", // Permite acceso a archivos en `public/`
  build: {
    outDir: "../../dist", // Carpeta donde se generará la compilación
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"), // Página principal
        connectWalletTest: path.resolve(__dirname, "components/ConnectWallet/ConnectWallet.test.html"), // Página de prueba
      },
    },
  },
  server: {
    watch: {
      usePolling: true,
    },
    open: "/components/ConnectWallet/ConnectWallet.test.html", // Abre la página de prueba al iniciar Vite
  },
});
