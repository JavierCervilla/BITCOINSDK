import * as Tabs from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils/style.ts";
import { useState } from "react";
import { DispensersList } from "@/components/Asset/Markets/Dispensers/DispenserList.component.tsx";
import { AtomicSwapList } from "@/components/Asset/Markets/AtomicSwaps/AtomicSwapList.component.tsx";
import type { BTCPrice } from "@/lib/bitcoin/api.d.ts";

import type * as OpenbookAPI from "@/lib/openbook/api.d.ts";
import type * as XCPAPI from "@/lib/counterparty/api.d.ts";
import { Loader } from "@/components/Loader/Loader.component.tsx";

const tabs = [
  { value: "swaps", label: "Atomic Swaps" },
  { value: "dispensers", label: "Dispensers" },
] as const;

interface MarketInfoProps {
  asset: string
  btcPrice: BTCPrice
  swaps: OpenbookAPI.OpenbookAtomicSwap[]
  dispensers: XCPAPI.XCPAPIDispenser[]
  isLoading: boolean
}


export function MarketInfo({ asset, btcPrice, swaps, dispensers, isLoading }: MarketInfoProps) {
  const [activeTab, setActiveTab] = useState("swaps");

  console.log({ dispensers, swaps })
  if (isLoading) {
    return <Loader />
  }

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
