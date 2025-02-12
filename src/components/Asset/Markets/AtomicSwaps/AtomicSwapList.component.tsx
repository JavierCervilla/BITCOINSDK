import type { OpenbookAtomicSwap } from "@/lib/openbook/api.d.ts"
import { AtomicSwapItem } from "./AtomicSwapItem.component.tsx"
import { Loader } from "@/components/Loader/Loader.component.tsx"
import type { BTCPrice } from "@/lib/bitcoin/api.d.ts";

interface AtomicSwapListProps {
  swaps: OpenbookAtomicSwap[]
  isLoading: boolean
  btcPrice: BTCPrice
}

export function AtomicSwapList({ btcPrice, swaps, isLoading }: AtomicSwapListProps) {
  if (isLoading) {
    return <Loader />
  }

  if (swaps.length === 0) {
    return <div className="text-center py-4 text-secondary">No Atomic swaps orders available</div>
  }

  return (
    <div className="flex flex-col  gap-2 max-h-[calc(100vh-200px)] md:max-h-[200px]">
      <div className="flex flex-col gap-2 overflow-auto">
        <div className="hidden md:flex flex-row justify-between items-center gap-2 p-2 bg-light border-b border-primary text-primary">
          <span className="text-sm font-medium w-1/5">Quantity</span>
          <span className="text-sm font-medium w-1/5">Price</span>
          <span className="text-sm font-medium w-1/5">Seller</span>
          <span className="text-sm font-medium w-1/5">Date</span>
          <span className="text-sm font-medium w-1/5">Action</span>
        </div>
        {swaps.map((swap) => (
          <AtomicSwapItem btcPrice={btcPrice} key={swap.txid} atomicSwap={swap} />
        ))}
      </div>
    </div>
  )
}
