import React, { useEffect, useRef, useState } from "react";
import { useWallet } from "bitcoinsdk/ui";

const ConnectWalletButton: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [walletReady, setWalletReady] = useState(false);

    useEffect(() => {
        console.log("🔍 React: Esperando que useWallet() esté listo...");
        const interval = setInterval(() => {
            if (globalThis.walletManagerInstance) {
                console.log("✅ React: walletManagerInstance encontrado, montando Web Component.");
                setWalletReady(true);
                clearInterval(interval);
            }
        }, 500);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (walletReady && containerRef.current) {
            console.log("🟢 React: Montando el Web Component connect-wallet-button");
            const webComponent = document.createElement("connect-wallet-button");
            containerRef.current.innerHTML = ""; // Limpiar contenedor antes de agregar el nuevo
            containerRef.current.appendChild(webComponent);
        }
    }, [walletReady]);

    return <div ref={containerRef} />;
};

export default ConnectWalletButton;
