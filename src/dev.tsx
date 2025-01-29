import React, {  useEffect } from "react";
import ReactDOM from "react-dom/client";
import { WalletProvider, useWallet } from "./context/walletContext.tsx";
import ConnectWalletButton from "./components/ConnectWallet.tsx";
import { walletConfig } from "./index.ts";
import "./styles/tailwind.css";


function DevApp() {
  const { walletAddress, walletProvider } = useWallet();

  const theme = "bitcoin-dark";
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);


  return (
    <div className="flex flex-col items-center justify-center h-screen bg-light">
      <ConnectWalletButton theme={theme} wallets={walletConfig} />
    </div>
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
