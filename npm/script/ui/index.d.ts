import { WalletProvider, useWallet } from './context/walletContext.js';
import ConnectWalletButton from './components/ConnectWallet/ConnectWallet.component.js';
import "./components/index.js";
export declare const UNIVERSE_WALLET_LABEL = "\uD83C\uDD84\uD83C\uDD7D\uD83C\uDD78\uD83C\uDD85\uD83C\uDD74\uD83C\uDD81\uD83C\uDD82\uD83C\uDD74";
export interface ConnectWalletReturn {
    address: string;
    publicKey: string;
}
declare const walletConfig: {
    Leather: {
        label: string;
        icon: string;
        connect: () => Promise<ConnectWalletReturn | null>;
        signMessage: (message: string) => Promise<any>;
        signPSBT: (psbt: string, options: import("./context/walletContext.js").SignPSBTOptions) => Promise<string | null>;
        pushTX: (txHex: string) => Promise<{
            result: string;
        }>;
    };
    Unisat: {
        label: string;
        icon: string;
        connect: () => Promise<ConnectWalletReturn | null>;
        signMessage: (message: string) => Promise<any>;
        signPSBT: (psbt: string, options: signPSBTOptions) => Promise<string | null>;
        pushTX: (txHex: string) => Promise<string | null>;
    };
    OKX: {
        label: string;
        icon: string;
        connect: () => Promise<ConnectWalletReturn | null>;
        signMessage: (message: string) => Promise<any>;
        signPSBT: (psbt: string, options: import("./context/walletContext.js").SignPSBTOptions) => Promise<string | null>;
        pushTX: (txHex: string) => Promise<{
            result: string;
        }>;
    };
    "\uD83C\uDD84\uD83C\uDD7D\uD83C\uDD78\uD83C\uDD85\uD83C\uDD74\uD83C\uDD81\uD83C\uDD82\uD83C\uDD74": {
        label: string;
        icon: string;
        connect: () => Promise<ConnectWalletReturn | null>;
        signMessage: (message: string) => Promise<any>;
        signPSBT: (psbt: string, options: import("./context/walletContext.js").SignPSBTOptions) => Promise<string | null>;
        pushTX: (txHex: string) => Promise<{
            result: string;
        }>;
    };
};
export { WalletProvider, useWallet, ConnectWalletButton, walletConfig };
