import type React from "react";
import { createContext, useState, useContext, useEffect, useMemo } from "react";
import type { ReactNode } from "react";

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

interface WalletConfig {
	label: string;
	connect: () => Promise<{ address: string; publicKey: string } | null>;
	signPSBT: (
		psbt: string,
		options?: SignPSBTOptions,
	) => Promise<string | null>;
	signMessage: (message: string) => Promise<string | null>;
	pushTX: (txHex: string) => Promise<string | null>;
}

interface WalletContextProps {
	walletAddress: string | null;
	publicKey: string | null;
	connected: boolean;
	walletProvider: string | null;
	connectWallet: (providerKey: string) => Promise<void>;
	disconnectWallet: () => void;
	signPSBT: (
		psbt: string,
		options?: SignPSBTOptions,
	) => Promise<string | null>;
	signMessage: (message: string) => Promise<string | null>;
	pushTX?: (txHex: string) => Promise<string | null>;
}

interface WalletProviderProps {
	children: ReactNode;
	wallets: { [key: string]: WalletConfig };
	theme: string;
}
interface LocalStoredWallets {
	[providerKey: string]: {
		address: string;
		publicKey: string;
	};
}

const WalletContext = createContext<WalletContextProps | undefined>(undefined);

export const WalletProvider: React.FC<WalletProviderProps> = ({
	children,
	wallets,
	theme="bitcoin-dark",
}: WalletProviderProps) => {
	const [walletAddress, setWalletAddress] = useState<string | null>(null);
	const [publicKey, setPublicKey] = useState<string | null>(null);
	const [connected, setConnected] = useState<boolean>(false);
	const [walletProvider, setWalletProvider] = useState<string | null>(null);

	useEffect(() => {
		// Al inicializar el proveedor, intentar reconectar desde localStorage
		connectWalletFromLocalStorage();
	}, []);

	useEffect(() => {
		document.documentElement.setAttribute("data-theme", theme)
	}, [theme])
	// Connect wallet from local storage
	const connectWalletFromLocalStorage = () => {
		const storedWallets = localStorage.getItem("wallets");
		const activeProvider = localStorage.getItem("activeProvider");

		if (storedWallets && activeProvider) {
			const parsedWallets: LocalStoredWallets = JSON.parse(storedWallets);
			const providerData = parsedWallets[activeProvider];

			if (providerData && wallets[activeProvider]) {
				setWalletProvider(wallets[activeProvider].label);
				setWalletAddress(providerData.address);
				setPublicKey(providerData.publicKey);
				setConnected(true);
			}
		}
	};

	const connectWallet = useMemo(() => async (providerKey: string) => {
		const walletConfig = wallets[providerKey];
		if (walletConfig) {
			const { address, publicKey } = (await walletConfig.connect()) || {};
			if (address && publicKey) {
				setWalletProvider(walletConfig.label);
				setWalletAddress(address);
				setPublicKey(publicKey);
				setConnected(true);
				
				const storedWallets = localStorage.getItem("wallets");
				const parsedWallets: LocalStoredWallets = storedWallets
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
			const parsedWallets: LocalStoredWallets = JSON.parse(storedWallets);
			delete parsedWallets[activeProvider];
			localStorage.setItem("wallets", JSON.stringify(parsedWallets));
		}
		localStorage.removeItem("activeProvider");
	};

	const signMessage = async (message: string) => {
		if (!walletProvider) {
			console.error("Wallet provider is not defined");
			return null;
		}
		return await wallets[walletProvider].signMessage(message);
	};

	const signPSBT = async (
		psbt: string,
		options?: SignPSBTOptions,
	): Promise<string | null> => {
		try {
			// Verifica que el proveedor de la billetera esté definido
			if (!walletProvider) {
				console.error("Wallet provider is not defined");
				return null;
			}

			// Obtén la configuración de la billetera
			const walletConfig = wallets[walletProvider];
			if (!walletConfig) {
				console.error(
					"Wallet configuration not found for provider:",
					walletProvider,
				);
				return null;
			}
			// Llama a la función signPSBT de la configuración de la billetera
			return await walletConfig.signPSBT(psbt, options);
		} catch (error) {
			console.error("Error signing PSBT:", error);
			return null;
		}
	};

	const pushTX = async (txHex: string) => {
		try {
			if (!walletProvider) {
				console.error("Wallet provider is not defined");
				return null;
			}
			const walletConfig = wallets[walletProvider];
			if (!walletConfig) {
				console.error(
					"Wallet configuration not found for provider:",
					walletProvider,
				);
				return null;
			}
			return await walletConfig.pushTX(txHex);
		} catch (error) {
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

	return (
		<WalletContext.Provider value={contextValue}>
			{children}
		</WalletContext.Provider>
	);
};

// Hook para usar el contexto
export const useWallet = (): WalletContextProps => {
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
