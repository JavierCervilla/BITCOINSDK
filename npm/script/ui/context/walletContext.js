"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWallet = exports.WalletManager = void 0;
const index_js_1 = require("../providers/index.js");
class WalletManager {
    constructor() {
        Object.defineProperty(this, "walletAddress", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        Object.defineProperty(this, "publicKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        Object.defineProperty(this, "connected", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "walletProvider", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        this.connectWalletFromLocalStorage();
    }
    connectWalletFromLocalStorage() {
        const storedWallets = localStorage.getItem("wallets");
        const activeProvider = localStorage.getItem("activeProvider");
        if (storedWallets && activeProvider) {
            const parsedWallets = JSON.parse(storedWallets);
            const providerData = parsedWallets[activeProvider];
            if (providerData && index_js_1.walletConfig[activeProvider]) {
                this.walletProvider = index_js_1.walletConfig[activeProvider].label;
                this.walletAddress = providerData.address;
                this.publicKey = providerData.publicKey;
                this.connected = true;
            }
        }
    }
    async connectWallet(providerKey) {
        const config = index_js_1.walletConfig[providerKey];
        if (config) {
            const { address, publicKey } = (await config.connect()) || {};
            if (address && publicKey) {
                this.walletProvider = config.label;
                this.walletAddress = address;
                this.publicKey = publicKey;
                this.connected = true;
                const storedWallets = localStorage.getItem("wallets");
                const parsedWallets = storedWallets ? JSON.parse(storedWallets) : {};
                parsedWallets[providerKey] = { address, publicKey };
                localStorage.setItem("wallets", JSON.stringify(parsedWallets));
                localStorage.setItem("activeProvider", providerKey);
            }
        }
        document.dispatchEvent(new CustomEvent("wallet-updated"));
    }
    disconnectWallet() {
        this.walletAddress = null;
        this.connected = false;
        this.walletProvider = null;
        const storedWallets = localStorage.getItem("wallets");
        const activeProvider = localStorage.getItem("activeProvider");
        if (storedWallets && activeProvider) {
            const parsedWallets = JSON.parse(storedWallets);
            delete parsedWallets[activeProvider];
            localStorage.setItem("wallets", JSON.stringify(parsedWallets));
        }
        localStorage.removeItem("activeProvider");
        document.dispatchEvent(new CustomEvent("wallet-updated"));
    }
    async signMessage(message) {
        if (!this.walletProvider) {
            console.error("Wallet provider is not defined");
            return null;
        }
        return await index_js_1.walletConfig[this.walletProvider].signMessage(message);
    }
    async signPSBT(psbt, options = {}) {
        try {
            if (!this.walletProvider) {
                console.error("Wallet provider is not defined");
                return null;
            }
            const config = index_js_1.walletConfig[this.walletProvider];
            if (!config) {
                console.error("Wallet configuration not found for provider:", this.walletProvider);
                return null;
            }
            return await config.signPSBT(psbt, options);
        }
        catch (error) {
            console.error("Error signing PSBT:", error);
            return null;
        }
    }
    async pushTX(txHex) {
        try {
            if (!this.walletProvider) {
                console.error("Wallet provider is not defined");
                return null;
            }
            const config = index_js_1.walletConfig[this.walletProvider];
            if (!config) {
                console.error("Wallet configuration not found for provider:", this.walletProvider);
                return null;
            }
            const result = await config.pushTX(txHex);
            return typeof result === 'string' ? result : result?.result || null;
        }
        catch (error) {
            console.error("Error pushing TX:", error);
            return null;
        }
    }
}
exports.WalletManager = WalletManager;
globalThis.walletManagerInstance = globalThis.walletManagerInstance || new WalletManager();
function useWallet() {
    return globalThis.walletManagerInstance;
}
exports.useWallet = useWallet;
