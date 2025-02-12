import { WalletProvider, walletConfig } from "@/index.ts";
import { ConnectWalletButton } from "./ConnectWallet.component.tsx"
import "@/styles/tailwind.css"
import ThemeSelector from "@/components/ThemeSelector/ThemeSelector.component.tsx";

export const ConnectWalletStorie = () => {
  return (
    <div className="flex flex-col gap-4 w-full h-full bg-light">
      <ThemeSelector />
      <WalletProvider theme="elegant-dark" wallets={walletConfig}>
        <ConnectWalletButton wallets={walletConfig} />
      </WalletProvider>
    </div>
  )
}