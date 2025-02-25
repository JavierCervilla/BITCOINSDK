import type { connectWalletReturn } from "@/index.ts";
export declare const connectUnisatWallet: () => Promise<connectWalletReturn | null>;
export declare const signMessageWithUnisat: (message: string) => Promise<any>;
export declare const signPSBTWithUnisat: (psbt: string, options: signPSBTOptions) => Promise<string | null>;
export declare const pushTXUnisat: (txHex: string) => Promise<string | null>;
