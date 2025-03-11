import { create } from "zustand";
import type { WalletConfig } from "../providers/index.ts";
import { walletConfig } from "../providers/index.ts";

export interface InputToSign {
    index: number;
    address: string;
    sighashTypes: number[];
}

export interface SignPSBTOptions {
    broadcast?: boolean;
    autoFinalized?: boolean;
    inputsToSign?: InputToSign[];
}

export interface WalletManagerInterface {
    walletAddress: string | null;
    publicKey: string | null;
    connected: boolean;
    walletProvider: string | null;
    connectWallet: (providerKey: string) => Promise<void>;
    disconnectWallet: () => void;
    signPSBT: (psbt: string, options?: SignPSBTOptions) => Promise<string | null>;
    signMessage: (message: string) => Promise<string | null>;
    pushTX?: (txHex: string) => Promise<string | { result: string; } | null>;
}

// ✅ Mantiene la sintaxis de WalletManager pero con Zustand internamente
class WalletManager implements WalletManagerInterface {
    walletAddress: string | null = null;
    publicKey: string | null = null;
    connected = false;
    walletProvider: string | null = null;

    constructor() {
        this.connectWalletFromLocalStorage();

        // 🔥 Enlazar métodos para evitar problemas de contexto
        this.connectWallet = this.connectWallet.bind(this);
        this.disconnectWallet = this.disconnectWallet.bind(this);
        this.signPSBT = this.signPSBT.bind(this);
        this.signMessage = this.signMessage.bind(this);
        this.pushTX = this.pushTX.bind(this);
    }

    private connectWalletFromLocalStorage(): void {
        const storedWallets = localStorage.getItem("wallets");
        const activeProvider = localStorage.getItem("activeProvider");

        if (storedWallets && activeProvider) {
            const parsedWallets = JSON.parse(storedWallets);
            const providerData = parsedWallets[activeProvider as keyof typeof walletConfig];

            if (providerData && walletConfig[activeProvider as keyof typeof walletConfig]) {
                useWalletStore.setState({
                    walletProvider: walletConfig[activeProvider].label,
                    walletAddress: providerData.address,
                    publicKey: providerData.publicKey,
                    connected: true,
                });
            }
        }
    }

    async connectWallet(providerKey: string): Promise<void> {
        console.log("🔗 Conectando a la wallet:", providerKey);
        const config = walletConfig[providerKey as keyof typeof walletConfig];

        if (config) {
            const { address, publicKey } = (await config.connect()) || {};
            if (address && publicKey) {
                useWalletStore.setState({
                    walletProvider: config.label,
                    walletAddress: address,
                    publicKey: publicKey,
                    connected: true,
                });

                localStorage.setItem("wallets", JSON.stringify({ [providerKey]: { address, publicKey } }));
                localStorage.setItem("activeProvider", providerKey);
                document.dispatchEvent(new CustomEvent("wallet-updated"));
            }
        }
    }

    disconnectWallet(): void {
        useWalletStore.setState({
            walletAddress: null,
            publicKey: null,
            connected: false,
            walletProvider: null,
        });

        localStorage.removeItem("wallets");
        localStorage.removeItem("activeProvider");
        document.dispatchEvent(new CustomEvent("wallet-updated"));
    }

    async signMessage(message: string): Promise<string | null> {
        const { walletProvider } = useWalletStore.getState();
        if (!walletProvider) {
            console.error("❌ Wallet provider no definido en signMessage()");
            return null;
        }
        return await walletConfig[walletProvider as keyof WalletConfig].signMessage(message);
    }

    async signPSBT(psbt: string, options: SignPSBTOptions = {}): Promise<string | null> {
        const { walletProvider } = useWalletStore.getState();
        if (!walletProvider) {
            console.error("❌ Wallet provider no definido en signPSBT()");
            return null;
        }
        return await walletConfig[walletProvider as keyof WalletConfig].signPSBT(psbt, options);
    }

    async pushTX(txHex: string): Promise<string | { result: string; } | null> {
        const { walletProvider } = useWalletStore.getState();
        if (!walletProvider) {
            console.error("❌ Wallet provider no definido en pushTX()");
            return null;
        }
        return await walletConfig[walletProvider as keyof WalletConfig].pushTX(txHex);
    }
}

const useWalletStore = create<WalletManagerInterface>(() => new WalletManager());

function useWallet(): WalletManagerInterface {
    return useWalletStore();
}

export { WalletManager, useWallet };
