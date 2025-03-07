"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWallet = exports.WalletProvider = void 0;
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const index_js_1 = require("../index.js");
const WalletContext = (0, react_2.createContext)(undefined);
const WalletProvider = ({ children, theme = "bitcoin-dark", }) => {
    const [walletAddress, setWalletAddress] = (0, react_2.useState)(null);
    const [publicKey, setPublicKey] = (0, react_2.useState)(null);
    const [connected, setConnected] = (0, react_2.useState)(false);
    const [walletProvider, setWalletProvider] = (0, react_2.useState)(null);
    (0, react_2.useEffect)(() => {
        // Al inicializar el proveedor, intentar reconectar desde localStorage
        connectWalletFromLocalStorage();
    }, []);
    (0, react_2.useEffect)(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);
    // Connect wallet from local storage
    const connectWalletFromLocalStorage = () => {
        const storedWallets = localStorage.getItem("wallets");
        const activeProvider = localStorage.getItem("activeProvider");
        if (storedWallets && activeProvider) {
            const parsedWallets = JSON.parse(storedWallets);
            const providerData = parsedWallets[activeProvider];
            if (providerData && index_js_1.walletConfig[activeProvider]) {
                setWalletProvider(index_js_1.walletConfig[activeProvider].label);
                setWalletAddress(providerData.address);
                setPublicKey(providerData.publicKey);
                setConnected(true);
            }
        }
    };
    const connectWallet = (0, react_2.useMemo)(() => async (providerKey) => {
        console.log("Connecting wallet:", providerKey);
        console.log("Wallets:", index_js_1.walletConfig);
        const walletConfig = index_js_1.walletConfig[providerKey];
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
    }, [index_js_1.walletConfig]);
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
        return await index_js_1.walletConfig[walletProvider].signMessage(message);
    };
    const signPSBT = async (psbt, options) => {
        try {
            // Verifica que el proveedor de la billetera esté definido
            if (!walletProvider) {
                console.error("Wallet provider is not defined");
                return null;
            }
            // Obtén la configuración de la billetera
            const walletConfig = index_js_1.walletConfig[walletProvider];
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
            const walletConfig = index_js_1.walletConfig[walletProvider];
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
    const contextValue = (0, react_2.useMemo)(() => ({
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
    return (react_1.default.createElement(WalletContext.Provider, { value: contextValue }, children));
};
exports.WalletProvider = WalletProvider;
// Hook para usar el contexto
const useWallet = () => {
    const context = (0, react_2.useContext)(WalletContext);
    if (!context) {
        throw new Error("useWallet must be used within a WalletProvider");
    }
    (0, react_2.useEffect)(() => {
        if (!context.connected) {
            context.connectWalletFromLocalStorage();
        }
    }, [context]);
    return context;
};
exports.useWallet = useWallet;
