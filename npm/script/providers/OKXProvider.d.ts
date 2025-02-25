import type { connectWalletReturn } from "@/WalletConnect/index.ts";
export declare const connectOKXWallet: () => Promise<connectWalletReturn | null>;
export declare const signMessageWithOKX: (message: string) => Promise<any>;
export declare const signPSBTWithOKX: (psbt: string, options: signPSBTOptions) => Promise<string | null>;
export declare const pushTXOKX: (txHex: string) => Promise<string | null>;
