import { useEffect, useState } from "react"
import { WalletIcon } from "lucide-react"

import { bitcoinsdk } from "@/core/index.ts";

import { useWallet } from "@/ui/context/walletContext.tsx"

import { Loader } from "@/ui/components/Loader/Loader.component.tsx";
import { ConnectWalletCTA } from "@/ui/components/ConnectWallet/ConnectWalletCTA.component.tsx";
import { XCPAssetsBalance } from "@/ui/components/Wallet/XCPAssetsBalance.component.tsx";

export function WalletView() {
  const { connected, walletAddress } = useWallet()
  const [balance, setBalance] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!walletAddress) return
    setIsLoading(true)
    Promise.all([
      bitcoinsdk.counterparty.getBalance({ address: walletAddress as string }),
      bitcoinsdk.openbook.getBTCBalance({ address: walletAddress as string })
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