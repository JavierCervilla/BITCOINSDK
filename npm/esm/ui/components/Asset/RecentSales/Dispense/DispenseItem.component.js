import React from "react";
import { memo } from "react";
import { short_address } from "../../../../utils/index.js";
function DispenseItemComponent({ dispense, btcPrice }) {
    return (React.createElement("div", { className: "flex flex-col p-4 space-y-4 transition-colors border rounded-lg border-primary md:flex-row md:space-y-0 md:gap-2 md:justify-between" },
        React.createElement("div", { className: "flex justify-between items-center md:flex-col md:w-1/5 md:items-start md:m-auto" },
            React.createElement("span", { className: "text-sm font-medium text-secondary md:hidden" }, "Quantity"),
            React.createElement("div", { className: "text-right md:text-left" },
                React.createElement("span", { className: "text-base sm:text-xs font-mono font-semibold truncate", title: dispense.dispense_quantity_normalized }, Number(dispense.dispense_quantity_normalized).toLocaleString()))),
        React.createElement("div", { className: "flex justify-between items-center md:flex-col md:w-1/5 md:items-start md:m-auto" },
            React.createElement("span", { className: "text-sm font-medium text-secondary md:hidden" }, "Unit Price"),
            React.createElement("div", { className: "text-right md:text-left" },
                React.createElement("span", { className: "text-base sm:text-xs font-mono font-semibold truncate block", title: dispense.dispenser.satoshi_price.toString() },
                    dispense.dispenser.satoshi_price.toLocaleString(),
                    " sats"),
                React.createElement("span", { className: "text-xs font-mono text-secondary truncate block", title: dispense.dispenser.satoshi_price.toString() },
                    "$",
                    (dispense.dispenser.satoshi_price * 10 ** -8 * btcPrice).toLocaleString()))),
        React.createElement("div", { className: "flex justify-between items-center md:flex-col md:w-1/5 md:items-start md:m-auto" },
            React.createElement("span", { className: "text-sm font-medium text-secondary md:hidden" }, "Total Price"),
            React.createElement("div", { className: "text-right md:text-left" },
                React.createElement("span", { className: "text-base sm:text-xs font-mono font-semibold truncate block", title: dispense.btc_amount.toString() },
                    dispense.btc_amount.toLocaleString(),
                    " sats"),
                React.createElement("span", { className: "text-xs font-mono text-secondary truncate block", title: dispense.btc_amount.toString() },
                    "$",
                    (dispense.btc_amount * 10 ** -8 * btcPrice).toLocaleString()))),
        React.createElement("div", { className: "flex justify-between items-center md:flex-col md:w-1/5 md:items-start md:m-auto" },
            React.createElement("span", { className: "text-sm font-medium text-secondary md:hidden" }, "Date"),
            React.createElement("span", { className: "text-base sm:text-xs font-mono truncate", title: new Date(dispense.block_time * 1000).toLocaleString() }, new Date(dispense.block_time * 1000).toLocaleDateString())),
        React.createElement("div", { className: "flex justify-between items-center md:flex-col md:w-1/5 md:items-start md:m-auto" },
            React.createElement("span", { className: "text-sm font-medium text-secondary md:hidden" }, "Transaction"),
            React.createElement("a", { href: `https://horizon.market/explorer/tx/${dispense.tx_hash}`, target: "_blank", rel: "noopener noreferrer", className: "text-xs font-mono truncate text-primary hover:underline", title: dispense.tx_hash }, short_address(dispense.tx_hash)))));
}
export const DispenseItem = memo(DispenseItemComponent);
