import { useEffect, useState } from "react"
import { useWallet } from "@/context/walletContext.tsx"
import { openbook } from "@/lib/openbook/api.ts"
import type { MarketData } from "@/types/openbook.d.ts"
import { TrendingUp, TrendingDown, BarChart2 } from "lucide-react"
import { Loader } from "@/components/Loader/Loader.component.tsx";
import { ConnectWalletCTA } from "@/components/ConnectWallet/ConnectWalletCTA.component.tsx";

export function MarketView() {
  const { connected } = useWallet()
  const [marketData, setMarketData] = useState<MarketData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const data = await openbook.getMarketData()
        setMarketData(data)
      } catch (error) {
        console.error("Error fetching market data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMarketData()
  }, [])

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="flex flex-col gap-6 p-4">
      <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
        <BarChart2 className="w-6 h-6" />
        Market Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {marketData.map((item: MarketData) => (
          <div key={item.id} className="bg-light border border-secondary rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-between gap-2">
                <img src={item.icon} alt={item.name} className="w-6 h-6" />
                <div className="flex flex-row items-baseline justify-center gap-2">
                  <h3 className="text-primary hidden sm:block">{item.name}</h3>
                  <p className="font-semibold text-sm text-secondary ">{item.symbol.toUpperCase()}</p>
                </div>
              </div>
              <p className="text-base font-bold text-primary">
                ${item.current_price.toLocaleString()}
              </p>
              <div className={`flex items-center gap-1 ${item.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {item.price_change_percentage_24h >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                <span className="text-sm font-medium">
                  {Math.abs(item.price_change_percentage_24h).toFixed(2)}%
                </span>
              </div>
            </div>

          </div>
        ))}
      </div>

      {!connected && (
        <ConnectWalletCTA />
      )}
    </div>
  )
} 