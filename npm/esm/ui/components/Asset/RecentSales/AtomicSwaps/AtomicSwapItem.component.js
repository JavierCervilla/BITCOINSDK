import React from "react";
import { memo } from "react";
import { short_address } from "../../../../utils/index.js";
function RecentSalesAtomicSwapItemComponent({ atomicSwap, btcPrice, asset }) {
    return (React.createElement("div", { className: "flex flex-col p-4 space-y-4 transition-colors border rounded-lg border-primary md:flex-row md:space-y-0 md:gap-2 md:justify-between" },
        React.createElement("div", { className: "flex justify-between items-center md:flex-col md:w-1/5 md:items-start md:m-auto" },
            React.createElement("span", { className: "text-sm font-medium text-secondary md:hidden" }, "Quantity"),
            React.createElement("div", { className: "text-right md:text-left" }, atomicSwap.utxo_balance
                .filter((balance) => balance.assetId === asset)
                .map((balance) => (React.createElement("span", { key: balance.assetId, className: "text-base sm:text-xs font-mono font-semibold truncate", title: balance.qty.toString() }, Number(balance.qty).toLocaleString()))))),
        React.createElement("div", { className: "flex justify-between items-center md:flex-col md:w-1/5 md:items-start md:m-auto" },
            React.createElement("span", { className: "text-sm font-medium text-secondary md:hidden" }, "Unit Price"),
            React.createElement("div", { className: "text-right md:text-left" },
                React.createElement("span", { className: "text-base sm:text-xs font-mono font-semibold truncate block", title: atomicSwap.unit_price.toString() },
                    atomicSwap.unit_price.toLocaleString(),
                    " sats"),
                React.createElement("span", { className: "text-xs font-mono text-secondary truncate block", title: atomicSwap.unit_price.toLocaleString() },
                    "$",
                    (atomicSwap.unit_price * 10 ** -8 * btcPrice).toLocaleString()))),
        React.createElement("div", { className: "flex justify-between items-center md:flex-col md:w-1/5 md:items-start md:m-auto" },
            React.createElement("span", { className: "text-sm font-medium text-secondary md:hidden" }, "Total Price"),
            React.createElement("div", { className: "text-right md:text-left" },
                React.createElement("span", { className: "text-base sm:text-xs font-mono font-semibold truncate block", title: atomicSwap.total_price.toString() },
                    atomicSwap.total_price.toLocaleString(),
                    " sats"),
                React.createElement("span", { className: "text-xs font-mono text-secondary truncate block", title: atomicSwap.total_price.toString() },
                    "$",
                    (atomicSwap.total_price * 10 ** -8 * btcPrice).toLocaleString()))),
        React.createElement("div", { className: "flex justify-between items-center md:flex-col md:w-1/5 md:items-start md:m-auto" },
            React.createElement("span", { className: "text-sm font-medium text-secondary md:hidden" }, "Date"),
            React.createElement("span", { className: "text-base sm:text-xs font-mono truncate", title: new Date(atomicSwap.timestamp).toLocaleString() }, new Date(atomicSwap.timestamp).toLocaleDateString())),
        React.createElement("div", { className: "flex justify-between items-center md:flex-col md:w-1/5 md:items-start md:m-auto" },
            React.createElement("span", { className: "text-sm font-medium text-secondary md:hidden" }, "Transaction"),
            React.createElement("a", { href: `https://horizon.market/explorer/tx/${atomicSwap.txid}`, target: "_blank", rel: "noopener noreferrer", className: "text-xs font-mono truncate text-primary hover:underline", title: atomicSwap.txid }, short_address(atomicSwap.txid)))));
}
export const RecentSalesAtomicSwapItem = memo(RecentSalesAtomicSwapItemComponent);
