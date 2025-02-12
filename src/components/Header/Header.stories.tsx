import { walletConfig, WalletProvider } from "@/index.ts";
import { Header } from "@/components/Header/Header.component.tsx"
import ThemeSelector from "@/components/ThemeSelector/ThemeSelector.component.tsx";
import "@/styles/tailwind.css"

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