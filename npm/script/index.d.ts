import { WalletProvider, useWallet } from './context/walletContext.js';
import ConnectWalletButton from '@/components/ConnectWallet/ConnectWallet.component.tsx';
export declare const UNIVERSE_WALLET_LABEL = "\uD83C\uDD84\uD83C\uDD7D\uD83C\uDD78\uD83C\uDD85\uD83C\uDD74\uD83C\uDD81\uD83C\uDD82\uD83C\uDD74";
export interface connectWalletReturn {
    address: string;
    publicKey: string;
}
declare const walletConfig: {
    Leather: {
        label: string;
        icon: any;
        connect: () => Promise<any>;
        signMessage: (message: string) => Promise<any>;
        signPSBT: (psbt: string, options: SignPSBTOptions) => Promise<string | null>;
        pushTX: (txHex: string) => Promise<any>;
    };
    Unisat: {
        label: string;
        icon: any;
        connect: () => Promise<any>;
        signMessage: (message: string) => Promise<any>;
        signPSBT: (psbt: string, options: signPSBTOptions) => Promise<string | null>;
        pushTX: (txHex: string) => Promise<string | null>;
    };
    OKX: {
        label: string;
        icon: any;
        connect: () => Promise<any>;
        signMessage: (message: string) => Promise<any>;
        signPSBT: (psbt: string, options: signPSBTOptions) => Promise<string | null>;
        pushTX: (txHex: string) => Promise<string | null>;
    };
    "\uD83C\uDD84\uD83C\uDD7D\uD83C\uDD78\uD83C\uDD85\uD83C\uDD74\uD83C\uDD81\uD83C\uDD82\uD83C\uDD74": {
        label: string;
        icon: any;
        connect: () => Promise<any>;
        signMessage: (message: string) => Promise<any>;
        signPSBT: (psbt: string, options: signPSBTOptions) => Promise<string | null>;
        pushTX: (txHex: string) => Promise<string | null>;
    };
};
export { WalletProvider, useWallet, ConnectWalletButton, walletConfig };
