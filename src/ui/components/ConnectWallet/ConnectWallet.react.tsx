import React, { useEffect, useRef } from "react";
import "./connectWallet.styles.css?inline";


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
