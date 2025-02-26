import React from "react";
import { useEffect, useState } from "react"
import { WalletIcon } from "lucide-react"

import { bitcoinsdk } from "../../../../core/index.js";

import { useWallet } from "../../../context/walletContext.js"

import { Loader } from "../../Loader/Loader.component.js";
import { ConnectWalletCTA } from "../../ConnectWallet/ConnectWalletCTA.component.js";
import { XCPAssetsBalance } from "../../Wallet/XCPAssetsBalance.component.js";

export function WalletView() {
  const { connected, walletAddress } = useWallet()
  const [balance, setBalance] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!walletAddress) return
    setIsLoading(true)
    Promise.all([
      bitcoinsdk.counterparty.getBalance({ address: walletAddress  }),
      bitcoinsdk.openbook.getBTCBalance({ address: walletAddress  })
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