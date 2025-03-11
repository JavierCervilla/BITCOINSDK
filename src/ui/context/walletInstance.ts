import { WalletManager } from "./walletContext.ts";

const walletManagerInstance = new WalletManager();

export function useWallet(): WalletManager {
    return walletManagerInstance;
}
