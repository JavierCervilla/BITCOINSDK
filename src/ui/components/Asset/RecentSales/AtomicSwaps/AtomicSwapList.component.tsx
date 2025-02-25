import { memo, useMemo } from "react"
import { FixedSizeList as List } from "react-window";

import { RecentSalesAtomicSwapItem } from "@/ui/components/Asset/RecentSales/AtomicSwaps/AtomicSwapItem.component.tsx"
import { Loader } from "@/ui/components/Loader/Loader.component.tsx"

import type * as OpenbookAPI from "@/core/openbook/api.d.ts"

interface AtomicSwapListProps {
  asset: string
  swaps: OpenbookAPI.OpenbookAtomicSwap[]
  isLoading: boolean
  btcPrice: number
}

function RecentSalesAtomicSwapListComponent({ asset, swaps, isLoading, btcPrice }: Readonly<AtomicSwapListProps>) {
  const ROW_HEIGHT = useMemo(() => {
    if (typeof globalThis !== "undefined") {
      if (globalThis.innerWidth < 640) return 260;
      if (globalThis.innerWidth < 1024) return 70;
      return 75;
    }
    return 75;
  }, []);
  const MAX_HEIGHT = 400;

  if (isLoading) {
    return <Loader />
  }

  if (swaps.length === 0) {
    return (
      <div className="text-center py-4 text-secondary flex flex-col  gap-2">
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
        <List
          height={MAX_HEIGHT}
          itemCount={swaps.length}
          itemSize={ROW_HEIGHT}
          width="100%"
        >
          {({ index, style }: { index: number; style: React.CSSProperties }) => {
            const swap = swaps[index];
            return (
              <div style={style}>
                <RecentSalesAtomicSwapItem btcPrice={btcPrice} key={swap.txid} atomicSwap={swap} asset={asset} />
              </div>
            )
          }}
        </List>
      </div>
    </div>
  )
}

export const RecentSalesAtomicSwapList = memo(RecentSalesAtomicSwapListComponent)