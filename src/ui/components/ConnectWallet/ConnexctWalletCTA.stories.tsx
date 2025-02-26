import React from "react";
import { WalletProvider, walletConfig } from "../../../ui/index.ts";

import { ThemeSelector } from "../../../ui/components/ThemeSelector/ThemeSelector.component.tsx";
import { ConnectWalletCTA } from "../../../ui/components/ConnectWallet/ConnectWalletCTA.component.tsx";

import "../../../ui/styles/tailwind.css"

export const ConnectWalletCTAStorie = () => {
  return (
    <div className="flex flex-col gap-4 w-full h-full bg-light">
      <ThemeSelector />
      <WalletProvider theme="elegant-dark" wallets={walletConfig}>
        <ConnectWalletCTA />
      </WalletProvider>
    </div>
  )
}