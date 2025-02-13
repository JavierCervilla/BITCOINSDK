import type { OpenbookAtomicSwap } from "@/lib/openbook/api.d.ts"
import { AtomicSwapItem } from "./AtomicSwapItem.component.tsx"
import { Loader } from "@/components/Loader/Loader.component.tsx"
import type { BTCPrice } from "@/lib/bitcoin/api.d.ts";

interface AtomicSwapListProps {
  asset: string
  swaps: OpenbookAtomicSwap[]
  isLoading: boolean
  btcPrice: BTCPrice
}

export function AtomicSwapList({ asset, swaps, isLoading, btcPrice }: AtomicSwapListProps) {
  if (isLoading) {
    return <Loader />
  }

  if (swaps.length === 0) {
    return (
      <div className="text-center py-4 text-secondary flex flex-col  gap-2 min-h-[calc(100vh-200px)] md:min-h-[200px]">
        <span className="text-sm font-medium">No Atomic swaps sales available</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col  gap-2 max-h-[calc(100vh-200px)] md:max-h-[200px]">
      <div className="flex flex-col gap-2 overflow-auto">
        <div className="hidden md:flex flex-row justify-between items-center gap-2 p-2 bg-light border-b border-primary text-primary">
          <span className="text-sm font-medium w-1/5">Quantity</span>
          <span className="text-sm font-medium w-1/5">Unit Price</span>
          <span className="text-sm font-medium w-1/5">Price</span>
          <span className="text-sm font-medium w-1/5">Date</span>
          <span className="text-sm font-medium w-1/5">Tx</span>
        </div>
        {swaps.map((swap) => (
          <AtomicSwapItem btcPrice={btcPrice} key={swap.txid} atomicSwap={swap} asset={asset} />
        ))}
      </div>
    </div>
  )
}
