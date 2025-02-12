import { useEffect, useState } from "react"
import { useWallet } from "@/context/walletContext.tsx"

import { counterparty } from "@/lib/counterparty/api.ts"
import { WalletIcon } from "lucide-react"
import { Loader } from "@/components/Loader/Loader.component.tsx";
import { ConnectWalletCTA } from "@/components/ConnectWallet/ConnectWalletCTA.component.tsx";
import { openbook } from "@/lib/openbook/api.ts";
import { XCPAssetsBalance } from "@/components/Wallet/XCPAssetsBalance.component.tsx";

export function WalletView() {
  const { connected, walletAddress } = useWallet()
  const [balance, setBalance] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!walletAddress) return
    setIsLoading(true)
    Promise.all([
      counterparty.getBalance({ address: walletAddress as string }),
      openbook.getBTCBalance({ address: walletAddress as string })
    ]).then(([xcpData, btcData]) => {
      setBalance({
        BTC: btcData,
        assets: xcpData
      });
      setIsLoading(false)
    });
  }, [walletAddress])

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="flex flex-col gap-6 p-4">
      <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
        <WalletIcon className="w-6 h-6" />
        Your Wallet
      </h1>

      
      <XCPAssetsBalance assets={balance.assets} />
      

      {!connected && (
        <ConnectWalletCTA />
      )}
    </div>
  )
} 