import { WalletProvider, useWallet } from './context/walletContext.tsx';
import ConnectWalletButton from '@/components/ConnectWallet/ConnectWallet.component.tsx';

import { connectLeatherWallet, signPSBTWithLeather, signMessageWithLeather, pushTXWithLeather } from './providers/LeatherProvider.ts';
import { connectUnisatWallet, signPSBTWithUnisat, pushTXUnisat, signMessageWithUnisat } from './providers/UnisatProvider.ts';
import { connectOKXWallet, signPSBTWithOKX, pushTXOKX, signMessageWithOKX } from './providers/OKXProvider.ts';
import { connectTapWallet, signMessageWithTapWallet, signPSBTWithTapWallet, pushTXTapWallet } from "./providers/TapWalletProvider.ts";

import { leatherImg, unisatImg, tapWalletImg, okxImg } from "@/assets/index.ts";

export const UNIVERSE_WALLET_LABEL = "🆄🅽🅸🆅🅴🆁🆂🅴";

export interface connectWalletReturn {
  address: string;
  publicKey: string;
}

const walletConfig = {
  Leather: {
    label: 'Leather',
    icon: leatherImg,
    connect: connectLeatherWallet,
    signMessage: signMessageWithLeather,
    signPSBT: signPSBTWithLeather,
    pushTX: pushTXWithLeather,
  },
  Unisat: {
    label: 'Unisat',
    icon: unisatImg,
    connect: connectUnisatWallet,
    signMessage: signMessageWithUnisat,
    signPSBT: signPSBTWithUnisat,
    pushTX: pushTXUnisat,
  },
  OKX: {
    label: 'OKX',
    icon: okxImg,
    connect: connectOKXWallet,
    signMessage: signMessageWithOKX,
    signPSBT: signPSBTWithOKX,
    pushTX: pushTXOKX,
  },
  "🆄🅽🅸🆅🅴🆁🆂🅴": {
    label: UNIVERSE_WALLET_LABEL,
    icon: tapWalletImg,
    connect: connectTapWallet,
    signMessage: signMessageWithTapWallet,
    signPSBT: signPSBTWithTapWallet,
    pushTX: pushTXTapWallet,
  },
};

export { WalletProvider, useWallet, ConnectWalletButton, walletConfig };
