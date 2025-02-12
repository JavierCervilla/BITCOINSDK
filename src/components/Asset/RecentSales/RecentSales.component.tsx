import * as Tabs from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils/style.ts";
import { useState, useEffect, useCallback } from "react";

import type * as OpenbookAPI from "@/lib/openbook/api.d.ts"
import type * as XCPAPI from "@/lib/counterparty/api.d.ts"

import { bitcoinsdk } from "@/lib/index.ts"
import { DispensesList } from "@/components/Asset/RecentSales/Dispense/DispenseList.component.tsx";
import { AtomicSwapList } from "@/components/Asset/RecentSales/AtomicSwaps/AtomicSwapList.component.tsx";
import type { BTCPrice } from "@/lib/bitcoin/api.d.ts";
const tabs = [
  { value: "swaps", label: "Atomic Swaps" },
  { value: "dispenses", label: "Dispenses" },
] as const;

export function RecentSales({ asset }: { asset: string }) {
  const [activeTab, setActiveTab] = useState("swaps");
  const [swaps, setSwaps] = useState<OpenbookAPI.OpenbookAtomicSwap[]>([]);
  const [dispenses, setDispenses] = useState<XCPAPI.XCPAPIDispenser[]>([]);
  const [btcPrice, setBtcPrice] = useState<BTCPrice | null>(null);
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    try {
      const [swapsData, dispensesData, btc_price] = await Promise.all([
        bitcoinsdk.openbook.getAtomicSalesByAsset({ asset }),
        bitcoinsdk.counterparty.getDispenses({ asset }),
        bitcoinsdk.bitcoin.getBTCPrice()
      ])
      setSwaps(swapsData.result)
      setDispenses(dispensesData)
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
        <span className="text-primary">{asset}</span> Recent Sales
      </h2>
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
          <AtomicSwapList asset={asset} btcPrice={btcPrice} swaps={swaps} isLoading={isLoading} />
        </Tabs.Content>
        <Tabs.Content value="dispenses" className="mt-4 bg-light p-2 rounded-md text-dark text-sm">
          <DispensesList btcPrice={btcPrice} dispenses={dispenses} isLoading={isLoading} />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
