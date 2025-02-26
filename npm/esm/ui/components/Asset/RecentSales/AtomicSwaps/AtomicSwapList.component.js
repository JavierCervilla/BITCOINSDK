import * as dntShim from "../../../../../_dnt.shims.js";
import React from "react";
import { memo, useMemo } from "react";
import { FixedSizeList as List } from "react-window";
import { RecentSalesAtomicSwapItem } from "./AtomicSwapItem.component.js";
import { Loader } from "../../../Loader/Loader.component.js";
function RecentSalesAtomicSwapListComponent({ asset, swaps, isLoading, btcPrice }) {
    const ROW_HEIGHT = useMemo(() => {
        if (typeof dntShim.dntGlobalThis !== "undefined") {
            if (globalThis.innerWidth < 640)
                return 260;
            if (globalThis.innerWidth < 1024)
                return 70;
            return 75;
        }
        return 75;
    }, []);
    const MAX_HEIGHT = 400;
    if (isLoading) {
        return React.createElement(Loader, null);
    }
    if (swaps.length === 0) {
        return (React.createElement("div", { className: "text-center py-4 text-secondary flex flex-col  gap-2" },
            React.createElement("span", { className: "text-sm font-medium" }, "No Atomic swaps sales available")));
    }
    return (React.createElement("div", { className: "flex flex-col  gap-2 max-h-[calc(100vh-200px)] md:max-h-[200px]" },
        React.createElement("div", { className: "flex flex-col gap-2 overflow-auto" },
            React.createElement("div", { className: "hidden md:flex flex-row justify-between items-center gap-2 p-2 bg-light border-b border-primary text-primary" },
                React.createElement("span", { className: "text-sm font-medium w-1/5" }, "Quantity"),
                React.createElement("span", { className: "text-sm font-medium w-1/5" }, "Unit Price"),
                React.createElement("span", { className: "text-sm font-medium w-1/5" }, "Price"),
                React.createElement("span", { className: "text-sm font-medium w-1/5" }, "Date"),
                React.createElement("span", { className: "text-sm font-medium w-1/5" }, "Tx")),
            React.createElement(List, { height: MAX_HEIGHT, itemCount: swaps.length, itemSize: ROW_HEIGHT, width: "100%" }, ({ index, style }) => {
                const swap = swaps[index];
                return (React.createElement("div", { style: style },
                    React.createElement(RecentSalesAtomicSwapItem, { btcPrice: btcPrice, key: swap.txid, atomicSwap: swap, asset: asset })));
            }))));
}
export const RecentSalesAtomicSwapList = memo(RecentSalesAtomicSwapListComponent);
