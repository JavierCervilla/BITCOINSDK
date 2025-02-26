import * as dntShim from "../../../../../_dnt.shims.js";
import React from "react";
import { memo, useMemo } from "react"
import { FixedSizeList as List } from "react-window";

import { DispenserItem } from "./DispenserItem.component.js"
import { Loader } from "../../../Loader/Loader.component.js"

import type * as XCPAPI from "../../../../../core/counterparty/api_2"

interface DispensersListProps {
  dispensers: XCPAPI.XCPAPIDispenser[]
  isLoading: boolean
  btcPrice: number
}

function DispensersListComponent({ dispensers, isLoading, btcPrice }: Readonly<DispensersListProps>) {
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
          <span className="text-sm font-medium w-1/5">Quantity</span>
          <span className="text-sm font-medium w-1/5">Remaining</span>
          <span className="text-sm font-medium w-1/5">Unit Price</span>
          <span className="text-sm font-medium w-1/5">Price</span>
          <span className="text-sm font-medium w-1/5">Date</span>
        </div>
        <List
          height={MAX_HEIGHT}
          itemCount={dispensers.length}
          itemSize={ROW_HEIGHT}
          width="100%"
        >
          {({ index, style }: Readonly<{ index: number; style: React.CSSProperties }>) => {
            const dispenser = dispensers[index]
            return (
              <div style={style}>
                <DispenserItem btcPrice={btcPrice} key={dispenser.tx_hash} dispenser={dispenser} />
              </div>
            )
          }}
        </List>

      </div>
    </div>
  )
}

export const DispensersList = memo(DispensersListComponent)