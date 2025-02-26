import React from "react";
import { walletConfig, WalletProvider } from "../../../ui/index.ts";
import { Loader } from "../../../ui/components/Loader/Loader.component.tsx"
import ThemeSelector from "../../../ui/components/ThemeSelector/ThemeSelector.component.tsx";
import "../../../ui/styles/tailwind.css"

export function LoaderStory() {
  return (
      <div className="flex flex-col gap-4 w-full h-full bg-light">
        <ThemeSelector variant="full"/>
        <WalletProvider theme="elegant-dark" wallets={walletConfig}>
          <Loader className="w-20 h-20" />
        </WalletProvider>
      </div>
  )
}