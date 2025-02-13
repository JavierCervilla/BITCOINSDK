import type { XCPAPIDispenser } from "@/lib/counterparty/api.d.ts"
import { DispenseItem } from "./DispenseItem.component.tsx"
import { Loader } from "@/components/Loader/Loader.component.tsx"
import type { BTCPrice } from "@/lib/bitcoin/api.d.ts";

interface DispensesListProps {
  dispenses: XCPAPIDispenser[]
  isLoading: boolean
  btcPrice: BTCPrice
}

export function DispensesList({ dispenses, isLoading, btcPrice }: DispensesListProps) {
  if (isLoading) {
    return <Loader />
  }

  if (dispenses.length === 0) {
    return (
      <div className="text-center py-4 text-secondary flex flex-col gap-2">
        <span className="text-sm font-medium">No Dispense sales available</span>
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
        {dispenses.map((dispense, index) => (
          <DispenseItem key={`${dispense.tx_hash}-${index}`} btcPrice={btcPrice} dispense={dispense} />
        ))}
      </div>
    </div>
  )
}
