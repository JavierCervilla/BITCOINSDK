import type { ConnectWalletReturn } from "./index.js";
export declare const connectWallet: () => Promise<ConnectWalletReturn | null>;
export declare const signMessage: (message: string) => Promise<any>;
export declare const signPSBT: (psbt: string, options: signPSBTOptions) => Promise<string | null>;
export declare const pushTX: (txHex: string) => Promise<string | null>;
