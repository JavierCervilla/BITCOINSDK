import * as Tabs from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils/style.ts";
import { useState, memo, useCallback } from "react";

import type * as OpenbookAPI from "@/lib/openbook/api.d.ts"
import type * as XCPAPI from "@/lib/counterparty/api.d.ts"

import { DispensesList } from "@/components/Asset/RecentSales/Dispense/DispenseList.component.tsx";
import { AtomicSwapList } from "@/components/Asset/RecentSales/AtomicSwaps/AtomicSwapList.component.tsx";
import type { BTCPrice } from "@/lib/bitcoin/api.d.ts";
import { Loader } from "@/components/Loader/Loader.component.tsx";

const tabs = [
  { value: "swaps", label: "Atomic Swaps" },
  { value: "dispenses", label: "Dispenses" },
] as const;

interface RecentSalesProps {
  asset: string
  btcPrice: BTCPrice
  swaps: OpenbookAPI.OpenbookAtomicSwap[]
  dispenses: XCPAPI.XCPAPIDispenser[]
  isLoading: boolean
}

function RecentSalesComponent({ asset, btcPrice, swaps, dispenses, isLoading }: RecentSalesProps) {
  const [activeTab, setActiveTab] = useState("swaps");

  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value);
  }, []);

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="bg-light p-4 rounded-lg shadow-md text-dark w-full border border-secondarysm:min-h-[calc(100vh-358px)] md:min-h-[358px]">
      <h2 className="font-bold text-lg">
        <span className="text-primary">{asset}</span> Recent Sales
      </h2>
      <Tabs.Root value={activeTab} onValueChange={handleTabChange}>
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

export const RecentSales = memo(RecentSalesComponent)