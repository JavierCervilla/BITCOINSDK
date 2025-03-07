import React from "react";
import { memo, useMemo } from "react";
import { FixedSizeList as List } from "react-window";

import { DispenseItem } from "./DispenseItem.component.tsx";
import { Loader } from "../../../../../ui/components/Loader/Loader.component.tsx";

import type * as XCPAPI from "../../../../../core/counterparty/api.d.ts";

interface DispensesListProps {
  dispenses: XCPAPI.XCPAPIDispenser[];
  isLoading: boolean;
  btcPrice: number;
}



const DispensesListComponent = ({ dispenses, isLoading, btcPrice }: Readonly<DispensesListProps>) => {
  
  const ROW_HEIGHT = useMemo(() => {
    if (typeof globalThis !== "undefined") {
      if (globalThis.innerWidth < 640) return 260;
      if (globalThis.innerWidth < 1024) return 75;
      return 75;
    }
    return 75;
  }, []);
  const MAX_HEIGHT = 400;
  
  if (isLoading) return <Loader />;

  if (dispenses.length === 0) {
    return (
      <div className="text-center py-4 text-secondary flex flex-col gap-2">
        <span className="text-sm font-medium">No Dispense sales available</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 max-h-[calc(100vh-200px)] md:max-h-[200px] overflow-auto">
      <div className="hidden md:flex flex-row justify-between items-center gap-2 p-2 bg-light border-b border-primary text-primary">
        <span className="text-sm font-medium w-1/5">Quantity</span>
        <span className="text-sm font-medium w-1/5">Unit Price</span>
        <span className="text-sm font-medium w-1/5">Price</span>
        <span className="text-sm font-medium w-1/5">Date</span>
        <span className="text-sm font-medium w-1/5">Tx</span>
      </div>

      {/* Virtualización de la lista */}
      <List
        height={MAX_HEIGHT}
        itemCount={dispenses.length}
        itemSize={ROW_HEIGHT}
        width="100%"
      >
        {({ index, style }: Readonly<{ index: number; style: React.CSSProperties }>) => {
          const dispense = dispenses[index];
          return (
            <div style={style}>
              <DispenseItem key={dispense.tx_hash} btcPrice={btcPrice} dispense={dispense} />
            </div>
          );
        }}
      </List>
    </div>
  );
};

export const DispensesList = memo(DispensesListComponent);
