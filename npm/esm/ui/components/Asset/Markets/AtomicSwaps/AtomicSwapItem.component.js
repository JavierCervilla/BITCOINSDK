import React from "react";
import { memo } from "react";
import { useWallet } from "../../../../index.js";
import { short_address } from "../../../../utils/index.js";
import { CancelOrderAction } from "../../Balance/actions/CancelOrder.component.js";
import { ConnectWalletAction } from "../../../ConnectWallet/ConnectWalletAction.component.js";
import { UTXOBuyOrderAction } from "../../Balance/actions/UTXOBuy.component.js";
function AtomicSwapItemComponent({ atomicSwap, btcPrice }) {
    const { walletAddress } = useWallet();
    return (React.createElement("div", { className: "flex flex-col p-4 space-y-4 transition-colors border rounded-lg border-primary md:flex-row md:space-y-0 md:gap-2 md:justify-between" },
        React.createElement("div", { className: "flex justify-between items-center md:flex-col md:w-1/5 md:items-start md:m-auto" },
            React.createElement("span", { className: "text-sm font-medium text-secondary md:hidden" }, "Quantity"),
            React.createElement("div", { className: "text-right md:text-left" }, atomicSwap.utxo_balance.map((balance) => (React.createElement("span", { key: balance.assetId, className: "text-base sm:text-xs font-mono font-semibold truncate", title: balance.qty.toString() }, Number(balance.qty).toLocaleString()))))),
        React.createElement("div", { className: "flex justify-between items-center md:flex-col md:w-1/5 md:items-start md:m-auto" },
            React.createElement("span", { className: "text-sm font-medium text-secondary md:hidden" }, "Price"),
            React.createElement("div", { className: "text-right md:text-left" },
                React.createElement("span", { className: "text-base sm:text-xs font-mono font-semibold truncate block", title: atomicSwap.price.toString() },
                    atomicSwap.price.toLocaleString(),
                    " sats"),
                React.createElement("span", { className: "text-xs font-mono text-secondary truncate block", title: atomicSwap.price.toString() },
                    "$",
                    (atomicSwap.price * 10 ** -8 * btcPrice).toLocaleString()))),
        React.createElement("div", { className: "flex justify-between items-center md:flex-col md:w-1/5 md:items-start md:m-auto" },
            React.createElement("span", { className: "text-sm font-medium text-secondary md:hidden" }, "Seller"),
            React.createElement("span", { className: "text-base sm:text-xs font-mono truncate", title: atomicSwap.seller }, short_address(atomicSwap.seller))),
        React.createElement("div", { className: "flex justify-between items-center md:flex-col md:w-1/5 md:items-start md:m-auto" },
            React.createElement("span", { className: "text-sm font-medium text-secondary md:hidden" }, "Date"),
            React.createElement("span", { className: "text-base sm:text-xs font-mono truncate", title: new Date(Number(atomicSwap.timestamp) * 1000).toLocaleString() }, new Date(Number(atomicSwap.timestamp) * 1000).toLocaleDateString())),
        React.createElement("div", { className: "flex justify-between items-center md:flex-col md:w-1/5 md:items-start md:m-auto" },
            React.createElement("span", { className: "text-sm font-medium text-secondary md:hidden" }, "Action"),
            walletAddress && walletAddress === atomicSwap.seller && atomicSwap.status === "active" && (React.createElement(CancelOrderAction, { order: atomicSwap })),
            walletAddress && walletAddress !== atomicSwap.seller && atomicSwap.status === "active" && (React.createElement(UTXOBuyOrderAction, { order: atomicSwap })),
            !walletAddress && (React.createElement(ConnectWalletAction, null)),
            atomicSwap.status !== "active" && (React.createElement("span", { className: "w-full capitalize ml-10 sm:ml-2 text-sm text-primary rounded-lg p-2 bg-warning border border-primary text-light bg-primary transition-colors text-center font-mono truncate" }, atomicSwap.status)))));
}
export const AtomicSwapItem = memo(AtomicSwapItemComponent);
