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
	pushTX?: (txHex: string) => Promise<string | null>;
}

class WalletManager implements WalletManagerInterface {
	walletAddress: string | null = null;
	publicKey: string | null = null;
	connected = false;
	walletProvider: string | null = null;

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
				this.walletProvider = walletConfig[activeProvider as keyof typeof walletConfig].label;
				this.walletAddress = providerData.address;
				this.publicKey = providerData.publicKey;
				this.connected = true;
			}
		}
	}

	async connectWallet(providerKey: string): Promise<void> {
		const config = walletConfig[providerKey as keyof typeof walletConfig];

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
	}

	disconnectWallet(): void {
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
	}

	async signMessage(message: string): Promise<string | null> {
		if (!this.walletProvider) {
			console.error("Wallet provider is not defined");
			return null;
		}
		return await walletConfig[this.walletProvider as keyof WalletConfig].signMessage(message);
	}

	async signPSBT(psbt: string, options: SignPSBTOptions = {}): Promise<string | null> {
		try {
			console.log("🔍 Checking WalletManager instance before signing");
			console.log("walletProvider:", this.walletProvider);
			console.log("walletAddress:", this.walletAddress);
			console.log("Connected:", this.connected);
	
			if (!this.walletProvider) {
				console.error("❌ Wallet provider is not defined (signPSBT)");
				return null;
			}
			const config = walletConfig[this.walletProvider as keyof WalletConfig];
			if (!config) {
				console.error("❌ Wallet configuration not found for provider:", this.walletProvider);
				return null;
			}
			return await config.signPSBT(psbt, options);
		} catch (error) {
			console.error("❌ Error signing PSBT:", error);
			return null;
		}
	}	

	async pushTX(txHex: string): Promise<string | null> {
		try {
			if (!this.walletProvider) {
				console.error("Wallet provider is not defined");
				return null;
			}
			const config = walletConfig[this.walletProvider as keyof WalletConfig];
			if (!config) {
				console.error("Wallet configuration not found for provider:", this.walletProvider);
				return null;
			}
			const result = await config.pushTX(txHex);
			return typeof result === 'string' ? result : result?.result || null;
		} catch (error) {
			console.error("Error pushing TX:", error);
			return null;
		}
	}
}

declare global {
    interface GlobalThis {
        walletManagerInstance?: WalletManager;
    }
}

if (!globalThis.walletManagerInstance) {
    console.log("🆕 Creando instancia global de WalletManager");
    globalThis.walletManagerInstance = new WalletManager();
} else {
    console.log("✅ Usando instancia global de WalletManager");
}

function useWallet(): WalletManager {
    return globalThis.walletManagerInstance!;
}


export { WalletManager, useWallet };
