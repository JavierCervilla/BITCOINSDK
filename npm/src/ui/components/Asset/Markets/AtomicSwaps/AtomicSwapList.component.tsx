import * as dntShim from "../../../../../_dnt.shims.js";
import React from "react";
import { useMemo, memo } from "react"
import { FixedSizeList as List } from "react-window";

import { AtomicSwapItem } from "./AtomicSwapItem.component.js"
import { Loader } from "../../../Loader/Loader.component.js"

import type * as BTCAPI from "../../../../../core/bitcoin/api_2"
import type * as OpenbookAPI from "../../../../../core/openbook/api"

interface AtomicSwapListProps {
  swaps: OpenbookAPI.OpenbookAtomicSwapOrder[]
  isLoading: boolean
  btcPrice: BTCAPI.BTCPrice
}

function AtomicSwapListComponent({ btcPrice, swaps, isLoading }: Readonly<AtomicSwapListProps>) {
  const ROW_HEIGHT = useMemo(() => {
    if (typeof dntShim.dntGlobalThis !== "undefined") {
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
        <span className="text-sm font-medium">No Atomic swaps orders available</span>
      </div>
    )
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
        <List
          height={MAX_HEIGHT}
          itemCount={swaps.length}
          itemSize={ROW_HEIGHT}
          width="100%"
        >
          {({ index, style }: Readonly<{ index: number; style: React.CSSProperties }>) => {
            const swap = swaps[index]
            return (
              <div style={style}>
                <AtomicSwapItem btcPrice={btcPrice} key={swap.txid} atomicSwap={swap} />
              </div>
            )
          }}
        </List>
      </div>
    </div>
  )
}

export const AtomicSwapList = memo(AtomicSwapListComponent)