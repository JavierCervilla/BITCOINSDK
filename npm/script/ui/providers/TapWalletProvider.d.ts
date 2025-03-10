import type { SignPSBTOptions } from "../context/walletContext.js";
import type { ConnectWalletReturn } from "./index.js";
export declare const connectWallet: () => Promise<ConnectWalletReturn | null>;
export declare const signMessage: (message: string) => Promise<any>;
export declare const signPSBT: (psbt: string, options: SignPSBTOptions) => Promise<string | null>;
export declare const pushTX: (txHex: string) => Promise<{
    result: string;
}>;
