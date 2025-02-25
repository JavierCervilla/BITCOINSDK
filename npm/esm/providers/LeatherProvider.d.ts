import "@/types/global.d.ts";
import type { connectWalletReturn } from "@/index.ts";
export declare const connectLeatherWallet: () => Promise<connectWalletReturn | null>;
export declare const signMessageWithLeather: (message: string) => Promise<any>;
export declare const signPSBTWithLeather: (psbt: string, options: SignPSBTOptions) => Promise<string | null>;
export declare const pushTXWithLeather: (txHex: string) => Promise<any>;
