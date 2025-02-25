import { walletConfig, WalletProvider } from "@/ui/index.ts";

import { Header } from "@/ui/components/Header/Header.component.tsx"
import ThemeSelector from "@/ui/components/ThemeSelector/ThemeSelector.component.tsx";

import "@styles/tailwind.css"

export function HeaderStory() {
  return (
      <div className="flex flex-col gap-4 w-full h-full bg-light">
        <ThemeSelector />
        <WalletProvider theme="elegant-dark" wallets={walletConfig}>
          <Header />
        </WalletProvider>
      </div>
  )
}