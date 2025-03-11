import  React, { useEffect, useRef } from "react";
import { useWallet } from "../../context/walletInstance.js";


const ConnectWalletButton: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const wallet = useWallet(); // 🚀 Obtiene la instancia única de WalletManager

    useEffect(() => {
        if (wallet && containerRef.current) {
            console.log("🟢 React: Montando el Web Component connect-wallet-button");

            if (!containerRef.current.querySelector("connect-wallet-button")) {
                const webComponent = document.createElement("connect-wallet-button");
                containerRef.current.innerHTML = "";
                containerRef.current.appendChild(webComponent);
            }
        }
    }, [wallet]);

    return <div ref={containerRef} />;
};

export default ConnectWalletButton;
