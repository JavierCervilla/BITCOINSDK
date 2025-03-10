import React, { useEffect, useRef } from "react";
const ConnectWalletButton = () => {
    const containerRef = useRef(null);
    useEffect(() => {
        if (containerRef.current) {
            const webComponent = document.createElement("connect-wallet-button");
            containerRef.current.innerHTML = ""; // Limpiar contenedor antes de agregar el nuevo
            containerRef.current.appendChild(webComponent);
        }
    }, []);
    return React.createElement("div", { ref: containerRef });
};
export default ConnectWalletButton;
