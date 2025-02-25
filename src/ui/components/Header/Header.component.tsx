import { useState, useEffect, useCallback } from "react"
import { TrendingUp, TrendingDown, Wallet } from "lucide-react"

import { bitcoinsdk } from "@/core/index.ts"

import { ConnectWalletButton } from "@/ui/components/ConnectWallet/ConnectWallet.component.tsx"
import { walletConfig } from "@/ui/index.ts"
import { useWallet } from "@/ui/context/walletContext.tsx"
import { HamburgerMenu } from "@/ui/components/HamburgerMenu/HamburgerMenu.component.tsx"
import { cn } from "@/ui/utils/style.ts";

import type * as OpenbookAPI from "@/core/openbook/api.d.ts"

const CryptoInfo: React.FC<{ data: OpenbookAPI.MarketData }> = ({ data }) => {
  const isPositive = data.price_change_percentage_24h >= 0
  const TrendIcon = isPositive ? TrendingUp : TrendingDown

  return (
    <div className="flex items-center gap-2 text-nowrap flex-nowrap px-4">
      <img src={data.icon || "/placeholder.svg"} alt={data.id} className="w-6 h-6" />
      <div className="flex items-center align-baseline space-x-2">
        <span className="hidden lg:block text-xs font-black text-muted-foreground uppercase">{data.symbol}</span>
        <span className="text-xs font-bold">
          {data.current_price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </span>
        <div className={cn("flex text-xs items-center", isPositive ? "text-green-500" : "text-red-500")}>
          <TrendIcon className="w-4 h-4" />
          <span className="text-sm font-medium">{Math.abs(data.price_change_percentage_24h).toFixed(2)}%</span>
        </div>
      </div>
    </div>
  )
}

const BalanceInfo: React.FC<{ balance: number; symbol: string }> = ({ balance, symbol }) => {
  const iconColor = symbol.toLowerCase() === 'btc' ? 'text-[#F7931A]' : 'text-[#FF3B9A]'

  return (
    <div className="flex items-center space-x-2">
      <Wallet className={`w-4 h-4 ${iconColor}`} />
      <span className="text-xs font-medium">
        {balance?.toFixed(symbol.toUpperCase() === "BTC" ? 4 : 2)}
      </span>
    </div>
  )
}

export function Header() {
  const { walletAddress, connected } = useWallet()
  const [cryptoData, setCryptoData] = useState<OpenbookAPI.MarketData[]>([])
  const [balances, setBalances] = useState<{ XCP: number; BTC: number } | null>(null)

  const fetchBalances = useCallback(async (address: string) => {
    const [xcpData, btcData] = await Promise.all([
      bitcoinsdk.counterparty.getTokenBalance({ asset: 'XCP', address }),
      bitcoinsdk.openbook.getBTCBalance({ address })
    ])
    setBalances({
      BTC: btcData,
      XCP: Number(xcpData[0]?.qty_normalized) || 0
    });
  }, []);

  useEffect(() => {
    bitcoinsdk.openbook.getMarketData().then((data) => {
      setCryptoData(data)
    })
  }, [])

  useEffect(() => {
    if (!walletAddress) return
    fetchBalances(walletAddress)
  }, [walletAddress, fetchBalances])

  return (
    <div className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex max-w-full min-w-fit flex-col lg:flex-row items-center justify-between px-4 py-3 lg:px-6 gap-4 mx-auto">
        <div className="flex flex-col w-full sm:flex-row gap-4 p-3 rounded-lg border border-border/50">
          {cryptoData.map((crypto: OpenbookAPI.MarketData, index: number) => (
            <div
              key={crypto.id}
              className={`flex w-full justify-around items-center sm:items-center gap-3 
                  ${index < cryptoData.length - 1 ? 'sm:border-r sm:border-border/50 sm:pr-4' : ''}`}
            >
              <CryptoInfo data={crypto} />
              {connected && balances && (
                <BalanceInfo
                  balance={balances[crypto.symbol.toUpperCase() as keyof typeof balances]}
                  symbol={crypto.symbol}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between lg:justify-end w-full gap-3">
          <HamburgerMenu />
          <ConnectWalletButton
            wallets={walletConfig}
            className="cursor-pointer hover:bg-primary hover:text-light important py-2.5 min-w-fit px-4 bg-light border border-primary text-nowrap text-primary hover:bg-primary hover:scale-105 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-300"
          />
        </div>
      </div>
    </div>
  )
}

