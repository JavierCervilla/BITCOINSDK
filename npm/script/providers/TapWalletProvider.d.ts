import type { connectWalletReturn } from "@/WalletConnect/index.ts";
export declare const connectTapWallet: () => Promise<connectWalletReturn | null>;
export declare const signMessageWithTapWallet: (message: string) => Promise<any>;
export declare const signPSBTWithTapWallet: (psbt: string, options: signPSBTOptions) => Promise<string | null>;
export declare const pushTXTapWallet: (txHex: string) => Promise<string | null>;
