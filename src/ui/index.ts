import { WalletProvider, useWallet } from './context/walletContext.tsx';
import ConnectWalletButton from './components/ConnectWallet/ConnectWallet.component.tsx';
import "./components/index.ts";

import * as LeatherProvider from './providers/LeatherProvider.ts';
import * as UnisatProvider from './providers/UnisatProvider.ts';
import * as OKXProvider from './providers/OKXProvider.ts';
import * as TapWalletProvider from "./providers/TapWalletProvider.ts";


import { leatherImg, unisatImg, tapWalletImg, okxImg } from "../assets/index.ts";

export const UNIVERSE_WALLET_LABEL = "🆄🅽🅸🆅🅴🆁🆂🅴";

export interface ConnectWalletReturn {
  address: string;
  publicKey: string;
}

const walletConfig = {
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

export { WalletProvider, useWallet, ConnectWalletButton, walletConfig };
