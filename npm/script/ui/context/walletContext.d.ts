import React from "react";
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
interface WalletContextProps {
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
interface WalletProviderProps {
    children: ReactNode;
    theme: string;
}
export declare const WalletProvider: React.FC<WalletProviderProps>;
export declare const useWallet: () => WalletContextProps;
export {};
