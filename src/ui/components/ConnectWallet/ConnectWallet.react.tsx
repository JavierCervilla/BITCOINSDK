import  React, { useEffect, useRef } from "react";
import { useWallet } from "../../context/walletInstance.ts";


const ConnectWalletButton: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const wallet = useWallet(); // 🚀 Accede a la instancia global

    useEffect(() => {
        if (wallet && containerRef.current) {
            console.log("🟢 React: Montando el Web Component connect-wallet-button");

            if (!containerRef.current.querySelector("connect-wallet-button")) {
                const webComponent = document.createElement("connect-wallet-button");
                containerRef.current.innerHTML = "";
                containerRef.current.appendChild(webComponent);
            }
        }

        const updateUI = () => containerRef.current?.firstChild?.remove();
        document.addEventListener("wallet-updated", updateUI);

        return () => {
            document.removeEventListener("wallet-updated", updateUI);
        };
    }, [wallet]);

    return <div ref={containerRef} />;
};

export default ConnectWalletButton;
