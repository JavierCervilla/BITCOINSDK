import React, { useEffect, useRef } from "react";
import { getWalletManagerInstance } from "../../context/walletContext.ts";
import { walletConfig } from "../../providers/index.ts";
import "./connectWalletButton.css";

// Inicializar WalletManager antes de usar el componente
getWalletManagerInstance(walletConfig);

const ConnectWalletButton: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            const webComponent = document.createElement("connect-wallet-button");
            containerRef.current.innerHTML = ""; // Limpiar contenedor antes de agregar el nuevo
            containerRef.current.appendChild(webComponent);
        }
    }, []);

    return <div ref={containerRef} />;
};

export default ConnectWalletButton;
