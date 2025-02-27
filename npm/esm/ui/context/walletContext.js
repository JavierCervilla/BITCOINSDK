import React from "react";
import { createContext, useState, useContext, useEffect, useMemo } from "react";
import { walletConfig as wallets } from "../index.js";
const WalletContext = createContext(undefined);
export const WalletProvider = ({ children, theme = "bitcoin-dark", }) => {
    const [walletAddress, setWalletAddress] = useState(null);
    const [publicKey, setPublicKey] = useState(null);
    const [connected, setConnected] = useState(false);
    const [walletProvider, setWalletProvider] = useState(null);
    useEffect(() => {
        // Al inicializar el proveedor, intentar reconectar desde localStorage
        connectWalletFromLocalStorage();
    }, []);
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);
    // Connect wallet from local storage
    const connectWalletFromLocalStorage = () => {
        const storedWallets = localStorage.getItem("wallets");
        const activeProvider = localStorage.getItem("activeProvider");
        if (storedWallets && activeProvider) {
            const parsedWallets = JSON.parse(storedWallets);
            const providerData = parsedWallets[activeProvider];
            if (providerData && wallets[activeProvider]) {
                setWalletProvider(wallets[activeProvider].label);
                setWalletAddress(providerData.address);
                setPublicKey(providerData.publicKey);
                setConnected(true);
            }
        }
    };
    const connectWallet = useMemo(() => async (providerKey) => {
        console.log("Connecting wallet:", providerKey);
        console.log("Wallets:", wallets);
        const walletConfig = wallets[providerKey];
        console.log("Wallet config:", walletConfig);
        if (walletConfig) {
            const { address, publicKey } = (await walletConfig.connect()) || {};
            if (address && publicKey) {
                setWalletProvider(walletConfig.label);
                setWalletAddress(address);
                setPublicKey(publicKey);
                setConnected(true);
                const storedWallets = localStorage.getItem("wallets");
                const parsedWallets = storedWallets
                    ? JSON.parse(storedWallets)
                    : {};
                parsedWallets[providerKey] = { address, publicKey };
                localStorage.setItem("wallets", JSON.stringify(parsedWallets));
                localStorage.setItem("activeProvider", providerKey);
            }
        }
    }, [wallets]);
    const disconnectWallet = () => {
        setWalletAddress(null);
        setConnected(false);
        setWalletProvider(null);
        const storedWallets = localStorage.getItem("wallets");
        const activeProvider = localStorage.getItem("activeProvider");
        if (storedWallets && activeProvider) {
            const parsedWallets = JSON.parse(storedWallets);
            delete parsedWallets[activeProvider];
            localStorage.setItem("wallets", JSON.stringify(parsedWallets));
        }
        localStorage.removeItem("activeProvider");
    };
    const signMessage = async (message) => {
        if (!walletProvider) {
            console.error("Wallet provider is not defined");
            return null;
        }
        return await wallets[walletProvider].signMessage(message);
    };
    const signPSBT = async (psbt, options) => {
        try {
            // Verifica que el proveedor de la billetera esté definido
            if (!walletProvider) {
                console.error("Wallet provider is not defined");
                return null;
            }
            // Obtén la configuración de la billetera
            const walletConfig = wallets[walletProvider];
            if (!walletConfig) {
                console.error("Wallet configuration not found for provider:", walletProvider);
                return null;
            }
            // Llama a la función signPSBT de la configuración de la billetera
            return await walletConfig.signPSBT(psbt, options);
        }
        catch (error) {
            console.error("Error signing PSBT:", error);
            return null;
        }
    };
    const pushTX = async (txHex) => {
        try {
            if (!walletProvider) {
                console.error("Wallet provider is not defined");
                return null;
            }
            const walletConfig = wallets[walletProvider];
            if (!walletConfig) {
                console.error("Wallet configuration not found for provider:", walletProvider);
                return null;
            }
            return await walletConfig.pushTX(txHex);
        }
        catch (error) {
            console.error("Error pushing TX:", error);
            return null;
        }
    };
    const contextValue = useMemo(() => ({
        walletAddress,
        publicKey,
        connected,
        walletProvider,
        connectWallet,
        disconnectWallet,
        connectWalletFromLocalStorage,
        signPSBT,
        signMessage,
        pushTX,
    }), [
        walletAddress,
        publicKey,
        connected,
        walletProvider,
        connectWallet,
        disconnectWallet,
        connectWalletFromLocalStorage,
        signPSBT,
        signMessage,
        pushTX
    ]);
    return (React.createElement(WalletContext.Provider, { value: contextValue }, children));
};
// Hook para usar el contexto
export const useWallet = () => {
    const context = useContext(WalletContext);
    if (!context) {
        throw new Error("useWallet must be used within a WalletProvider");
    }
    useEffect(() => {
        if (!context.connected) {
            context.connectWalletFromLocalStorage();
        }
    }, [context]);
    return context;
};
