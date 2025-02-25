import { WalletProvider, useWallet } from './context/walletContext.js';
import ConnectWalletButton from '@/components/ConnectWallet/ConnectWallet.component.tsx';
import { connectLeatherWallet, signPSBTWithLeather, signMessageWithLeather, pushTXWithLeather } from './providers/LeatherProvider.js';
import { connectUnisatWallet, signPSBTWithUnisat, pushTXUnisat, signMessageWithUnisat } from './providers/UnisatProvider.js';
import { connectOKXWallet, signPSBTWithOKX, pushTXOKX, signMessageWithOKX } from './providers/OKXProvider.js';
import { connectTapWallet, signMessageWithTapWallet, signPSBTWithTapWallet, pushTXTapWallet } from "./providers/TapWalletProvider.js";
import { leatherImg, unisatImg, tapWalletImg, okxImg } from "@/assets/index.ts";
export const UNIVERSE_WALLET_LABEL = "🆄🅽🅸🆅🅴🆁🆂🅴";
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
