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
export declare class WalletManager implements WalletManagerInterface {
    walletAddress: string | null;
    publicKey: string | null;
    connected: boolean;
    walletProvider: string | null;
    constructor();
    private connectWalletFromLocalStorage;
    connectWallet(providerKey: string): Promise<void>;
    disconnectWallet(): void;
    signMessage(message: string): Promise<string | null>;
    signPSBT(psbt: string, options?: SignPSBTOptions): Promise<string | null>;
    pushTX(txHex: string): Promise<string | null>;
}
export declare function useWallet(): WalletManager;
