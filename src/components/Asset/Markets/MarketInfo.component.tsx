import * as Tabs from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils/style.ts";
import { useState, useEffect, useCallback } from "react";

import type * as OpenbookAPI from "@/lib/openbook/api.d.ts"
import type * as XCPAPI from "@/lib/counterparty/api.d.ts"

import { bitcoinsdk } from "@/lib/index.ts"
import { DispensersList } from "@/components/Asset/Markets/Dispensers/DispenserList.component.tsx";
import { AtomicSwapList } from "@/components/Asset/Markets/AtomicSwaps/AtomicSwapList.component.tsx";

const tabs = [
  { value: "swaps", label: "Atomic Swaps" },
  { value: "dispensers", label: "Dispensers" },
] as const;

export function MarketInfo({ asset }: { asset: string }) {
  const [activeTab, setActiveTab] = useState("swaps");
  const [swaps, setSwaps] = useState<OpenbookAPI.OpenbookAtomicSwap[]>([]);
  const [dispensers, setDispensers] = useState<XCPAPI.XCPAPIDispenser[]>([]);
  const [btcPrice, setBtcPrice] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    try {
      const [swapsData, dispensersData, btc_price] = await Promise.all([
        bitcoinsdk.openbook.getAtomicSwapOrdersByAsset({ asset }),
        bitcoinsdk.counterparty.getDispensers({ asset }),
        bitcoinsdk.bitcoin.getBTCPrice()
      ])
      setSwaps(swapsData.result)
      setDispensers(dispensersData)
      setBtcPrice(btc_price)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setIsLoading(false)
    }
  }, [asset])

  useEffect(() => {
    fetchData()
  }, [fetchData])



  return (
    <div className="bg-light p-4 rounded-lg shadow-md text-dark w-full border border-secondary">
      <h2 className="font-bold text-lg">
        <span className="text-primary">{asset}</span> Markets
      </h2>
      <div className="flex flex-row gap-4">
        <p className="text-sm text-secondary">BTC Volume: <span className="text-primary">0.00 BTC</span></p>
        <p className="text-sm text-secondary">MarketCap: <span className="text-primary">0.00 BTC</span></p>
      </div>
      <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
        <Tabs.List className="flex border-b border-secondary space-x-4">
          {tabs.map((tab) => (
            <Tabs.Trigger
              key={tab.value}
              value={tab.value}
              className={cn(
                "p-2 text-secondary transition-all border-b-2 border-transparent cursor-pointer hover:text-primary",
                activeTab === tab.value ? "text-primary border-primary" : "text-secondary"
              )}
            >
              {tab.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        <Tabs.Content value="swaps" className="mt-4 bg-light p-2 rounded-md text-dark text-sm">
          <AtomicSwapList btcPrice={btcPrice} swaps={swaps} isLoading={isLoading} />
        </Tabs.Content>
        <Tabs.Content value="dispensers" className="mt-4 bg-light p-2 rounded-md text-dark text-sm">
          <DispensersList btcPrice={btcPrice} dispensers={dispensers} isLoading={isLoading} />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
