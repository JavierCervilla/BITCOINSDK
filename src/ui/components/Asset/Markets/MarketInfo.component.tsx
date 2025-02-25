import { useState, useCallback, memo } from "react";
import * as Tabs from "@radix-ui/react-tabs";

import { cn } from "@/ui/utils/style.ts";
import { DispensersList } from "@/ui/components/Asset/Markets/Dispensers/DispenserList.component.tsx";
import { AtomicSwapList } from "@/ui/components/Asset/Markets/AtomicSwaps/AtomicSwapList.component.tsx";
import { Loader } from "@/ui/components/Loader/Loader.component.tsx";

import type * as OpenbookAPI from "@/core/openbook/api.d.ts";
import type * as XCPAPI from "@/core/counterparty/api.d.ts";

const tabs = [
  { value: "swaps", label: "Atomic Swaps" },
  { value: "dispensers", label: "Dispensers" },
] as const;

interface MarketInfoProps {
  asset: string
  btcPrice: number
  swaps: OpenbookAPI.OpenbookAtomicSwapOrder[]
  dispensers: XCPAPI.XCPAPIDispenser[]
  isLoading: boolean
  mcap: number
  volume: number
}

function MarketInfoComponent({ asset, btcPrice, swaps, dispensers, isLoading, mcap, volume }: Readonly<MarketInfoProps>) {
  const [activeTab, setActiveTab] = useState("swaps");

  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value);
  }, []);

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="bg-light p-4 rounded-lg shadow-md text-dark w-full border border-secondary sm:min-h-[calc(100vh-358px)] md:min-h-[358px]">
      <h2 className="font-bold text-lg">
        <span className="text-primary">{asset}</span> Markets
      </h2>
      <div className="flex flex-row gap-4">
        <p className="text-sm text-secondary">BTC Volume: <span className="text-primary">{volume.toLocaleString()} BTC <span className="text-xs text-secondary">({Number(volume * btcPrice).toLocaleString()} $)</span></span></p>
        <p className="text-sm text-secondary">MarketCap: <span className="text-primary">{mcap.toLocaleString()} BTC <span className="text-secondary text-xs">({Number(mcap * btcPrice).toLocaleString()} $)</span></span></p>
      </div>
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
          <AtomicSwapList btcPrice={btcPrice} swaps={swaps} isLoading={isLoading} />
        </Tabs.Content>
        <Tabs.Content value="dispensers" className="mt-4 bg-light p-2 rounded-md text-dark text-sm">
          <DispensersList btcPrice={btcPrice} dispensers={dispensers} isLoading={isLoading} />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}

export const MarketInfo = memo(MarketInfoComponent)