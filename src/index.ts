import { WalletProvider, useWallet } from './context/walletContext.tsx';
import ConnectWalletButton from './components/ConnectWallet.tsx';

import { connectLeatherWallet, signPSBTWithLeather, signMessageWithLeather, pushTXWithLeather } from './providers/LeatherProvider.ts';
import { connectUnisatWallet, signPSBTWithUnisat, pushTXUnisat, signMessageWithUnisat } from './providers/UnisatProvider.ts';
import { connectOKXWallet, signPSBTWithOKX, pushTXOKX, signMessageWithOKX } from './providers/OKXProvider.ts';
import { connectTapWallet, signMessageWithTapWallet, signPSBTWithTapWallet, pushTXTapWallet } from "./providers/TapWalletProvider.ts";

import leatherIcon from './assets/leather.png';
import unisatIcon from './assets/unisat.png';
import tapwalletIcon from './assets/tapwallet.png';
import okxIcon from './assets/okx.png';

export const UNIVERSE_WALLET_LABEL = "🆄🅽🅸🆅🅴🆁🆂🅴";

export interface connectWalletReturn {
  address: string;
  publicKey: string;
}

const walletConfig = {
  Leather: {
    label: 'Leather',
    icon: leatherIcon,
    connect: connectLeatherWallet,
    signMessage: signMessageWithLeather,
    signPSBT: signPSBTWithLeather,
    pushTX: pushTXWithLeather,
  },
  Unisat: {
    label: 'Unisat',
    icon: unisatIcon,
    connect: connectUnisatWallet,
    signMessage: signMessageWithUnisat,
    signPSBT: signPSBTWithUnisat,
    pushTX: pushTXUnisat,
  },
  OKX: {
    label: 'OKX',
    icon: okxIcon,
    connect: connectOKXWallet,
    signMessage: signMessageWithOKX,
    signPSBT: signPSBTWithOKX,
    pushTX: pushTXOKX,
  },
  "🆄🅽🅸🆅🅴🆁🆂🅴": {
    label: UNIVERSE_WALLET_LABEL,
    icon: tapwalletIcon,
    connect: connectTapWallet,
    signMessage: signMessageWithTapWallet,
    signPSBT: signPSBTWithTapWallet,
    pushTX: pushTXTapWallet,
  },
};

export { WalletProvider, useWallet, ConnectWalletButton, walletConfig };
