import * as LeatherProvider from './LeatherProvider.js';
import * as UnisatProvider from './UnisatProvider.js';
import * as OKXProvider from './OKXProvider.js';
import * as TapWalletProvider from "./TapWalletProvider.js";


import { leatherImg, unisatImg, tapWalletImg, okxImg } from "../../assets/index.js";


export const UNIVERSE_WALLET_LABEL = "🆄🅽🅸🆅🅴🆁🆂🅴";

export const walletConfig = {
    Leather: {
        label: 'Leather',
        icon: leatherImg,
        connect: LeatherProvider.connectWallet,
        signMessage: LeatherProvider.signMessage,
        signPSBT: LeatherProvider.signPSBT,
        pushTX: LeatherProvider.pushTX,
    },
    Unisat: {
        label: 'Unisat',
        icon: unisatImg,
        connect: UnisatProvider.connectWallet,
        signMessage: UnisatProvider.signMessage,
        signPSBT: UnisatProvider.signPSBT,
        pushTX: UnisatProvider.pushTX,
    },
    OKX: {
        label: 'OKX',
        icon: okxImg,
        connect: OKXProvider.connectWallet,
        signMessage: OKXProvider.signMessage,
        signPSBT: OKXProvider.signPSBT,
        pushTX: OKXProvider.pushTX,
    },
    "🆄🅽🅸🆅🅴🆁🆂🅴": {
        label: UNIVERSE_WALLET_LABEL,
        icon: tapWalletImg,
        connect: TapWalletProvider.connectWallet,
        signMessage: TapWalletProvider.signMessage,
        signPSBT: TapWalletProvider.signPSBT,
        pushTX: TapWalletProvider.pushTX,
    },
};

export interface ConnectWalletReturn {
    address: string;
    publicKey: string;
}

export type WalletConfig = typeof walletConfig;