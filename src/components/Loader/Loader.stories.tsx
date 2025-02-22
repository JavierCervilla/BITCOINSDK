import { walletConfig, WalletProvider } from "@/index.ts";
import { Loader } from "@/components/Loader/Loader.component.tsx"
import ThemeSelector from "@/components/ThemeSelector/ThemeSelector.component.tsx";
import "@styles/tailwind.css"

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