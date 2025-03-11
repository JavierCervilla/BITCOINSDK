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

export interface WalletState {
	walletAddress: string | null;
	publicKey: string | null;
	connected: boolean;
	walletProvider: string | null;

	setWalletState: (state: Partial<WalletState>) => void;
}

const useWalletStore = create<WalletState>((set) => ({
	walletAddress: null,
	publicKey: null,
	connected: false,
	walletProvider: null,

	setWalletState: (state: Partial<WalletState>) => set(state),
}));

// Clase que maneja la lógica de interacción
class WalletManager {
	constructor() {
		this.connectWalletFromLocalStorage();
	}

	private connectWalletFromLocalStorage(): void {
		const storedWallets = localStorage.getItem("wallets");
		const activeProvider = localStorage.getItem("activeProvider");

		if (storedWallets && activeProvider) {
			const parsedWallets = JSON.parse(storedWallets);
			const providerData = parsedWallets[activeProvider as keyof typeof walletConfig];

			if (providerData && walletConfig[activeProvider as keyof typeof walletConfig]) {
				useWalletStore.getState().setWalletState({
					walletProvider: walletConfig[activeProvider].label,
					walletAddress: providerData.address,
					publicKey: providerData.publicKey,
					connected: true,
				});
			}
		}
	}

	async connectWallet(providerKey: string): Promise<void> {
		const config = walletConfig[providerKey as keyof typeof walletConfig];

		if (config) {
			const { address, publicKey } = (await config.connect()) || {};
			if (address && publicKey) {
				useWalletStore.getState().setWalletState({
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
		useWalletStore.getState().setWalletState({
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
			console.error("Wallet provider no definido en signMessage()");
			return null;
		}
		return walletConfig[walletProvider as keyof WalletConfig].signMessage(message);
	}

	async signPSBT(psbt: string, options: SignPSBTOptions = {}): Promise<string | null> {
		const { walletProvider } = useWalletStore.getState();
		if (!walletProvider) {
			console.error("Wallet provider no definido en signPSBT()");
			return null;
		}
		return walletConfig[walletProvider as keyof WalletConfig].signPSBT(psbt, options);
	}

	async pushTX(txHex: string): Promise<string | { result: string } | null> {
		const { walletProvider } = useWalletStore.getState();
		if (!walletProvider) {
			console.error("Wallet provider no definido en pushTX()");
			return null;
		}
		return walletConfig[walletProvider as keyof WalletConfig].pushTX(txHex);
	}
}

// Exportamos un Singleton del WalletManager
const walletManager = new WalletManager();

function useWallet(): WalletState & Pick<WalletManager, 
    "connectWallet" | 
    "disconnectWallet" | 
    "signMessage" | 
    "signPSBT" | 
    "pushTX"
> {
    const state = useWalletStore();
    return { 
        ...state, 
        connectWallet: walletManager.connectWallet,
        disconnectWallet: walletManager.disconnectWallet,
        signMessage: walletManager.signMessage,
        signPSBT: walletManager.signPSBT,
        pushTX: walletManager.pushTX,
    };
}

export { WalletManager, useWallet };
