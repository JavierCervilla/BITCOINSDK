import type { XCPAPIDispenser } from "@/lib/counterparty/api.d.ts"
import { DispenserItem } from "./DispenserItem.component.tsx"
import { Loader } from "@/components/Loader/Loader.component.tsx"
import { BTCPrice } from "@/lib/bitcoin/api.d.ts";

interface DispensersListProps {
  dispensers: XCPAPIDispenser[]
  isLoading: boolean
  btcPrice: BTCPrice
}

export function DispensersList({ dispensers, isLoading, btcPrice }: DispensersListProps) {
  if (isLoading) {
    return <Loader />
  }

  if (dispensers.length === 0) {
    return (
      <div className="text-center py-4 text-secondary flex flex-col  gap-2">
        <span className="text-sm font-medium">No Dispenser sales available</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2 max-h-[calc(100vh-200px)] md:max-h-[200px]">
      <div className="flex flex-col gap-2 overflow-auto">
        <div className="hidden md:flex flex-row justify-between items-center gap-2 p-2 bg-light border-b border-primary text-primary">
          <span className="text-sm font-medium w-1/4">Quantity</span>
          <span className="text-sm font-medium w-1/4">Unit Price</span>
          <span className="text-sm font-medium w-1/4">Price</span>
          <span className="text-sm font-medium w-1/4">Date</span>
        </div>
        {dispensers.map((dispenser) => (
          <DispenserItem btcPrice={btcPrice} key={dispenser.tx_hash} dispenser={dispenser} />
        ))}
      </div>
    </div>
  )
}
