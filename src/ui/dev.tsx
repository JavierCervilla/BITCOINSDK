import  React from "react";
import ReactDOM from "react-dom/client";

import { WalletProvider } from "./context/walletContext.tsx";
import { walletConfig } from "./index.ts";
import { OpenBookApp } from "./components/OpenBookApp/OpenBookApp.component.tsx";

import "./styles/tailwind.css";

function DevApp() {

  return (
    <OpenBookApp isOpen onClose={() => {}} />
  );
}

// Renderizar el entorno de prueba
const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <WalletProvider wallets={walletConfig}>
        <DevApp />
      </WalletProvider>
    </React.StrictMode>
  );
}
