//TODO: Refactor for using without the provider name in function importin * from provider and calling functions as provider.function

import { WalletProvider, useWallet } from '@/ui/context/walletContext.tsx';
import ConnectWalletButton from '@/ui/components/ConnectWallet/ConnectWallet.component.tsx';

import * as LeatherProvider from '@/ui/providers/LeatherProvider.ts';
import * as UnisatProvider from '@/ui/providers/UnisatProvider.ts';
import * as OKXProvider from '@/ui/providers/OKXProvider.ts';
import * as TapWalletProvider from "@/ui/providers/TapWalletProvider.ts";

import { leatherImg, unisatImg, tapWalletImg, okxImg } from "@/assets/index.ts";

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
