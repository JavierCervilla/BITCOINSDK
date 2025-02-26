"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecentSalesAtomicSwapItem = void 0;
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const index_js_1 = require("../../../../utils/index.js");
function RecentSalesAtomicSwapItemComponent({ atomicSwap, btcPrice, asset }) {
    return (react_1.default.createElement("div", { className: "flex flex-col p-4 space-y-4 transition-colors border rounded-lg border-primary md:flex-row md:space-y-0 md:gap-2 md:justify-between" },
        react_1.default.createElement("div", { className: "flex justify-between items-center md:flex-col md:w-1/5 md:items-start md:m-auto" },
            react_1.default.createElement("span", { className: "text-sm font-medium text-secondary md:hidden" }, "Quantity"),
            react_1.default.createElement("div", { className: "text-right md:text-left" }, atomicSwap.utxo_balance
                .filter((balance) => balance.assetId === asset)
                .map((balance) => (react_1.default.createElement("span", { key: balance.assetId, className: "text-base sm:text-xs font-mono font-semibold truncate", title: balance.qty.toString() }, Number(balance.qty).toLocaleString()))))),
        react_1.default.createElement("div", { className: "flex justify-between items-center md:flex-col md:w-1/5 md:items-start md:m-auto" },
            react_1.default.createElement("span", { className: "text-sm font-medium text-secondary md:hidden" }, "Unit Price"),
            react_1.default.createElement("div", { className: "text-right md:text-left" },
                react_1.default.createElement("span", { className: "text-base sm:text-xs font-mono font-semibold truncate block", title: atomicSwap.unit_price.toString() },
                    atomicSwap.unit_price.toLocaleString(),
                    " sats"),
                react_1.default.createElement("span", { className: "text-xs font-mono text-secondary truncate block", title: atomicSwap.unit_price.toLocaleString() },
                    "$",
                    (atomicSwap.unit_price * 10 ** -8 * btcPrice).toLocaleString()))),
        react_1.default.createElement("div", { className: "flex justify-between items-center md:flex-col md:w-1/5 md:items-start md:m-auto" },
            react_1.default.createElement("span", { className: "text-sm font-medium text-secondary md:hidden" }, "Total Price"),
            react_1.default.createElement("div", { className: "text-right md:text-left" },
                react_1.default.createElement("span", { className: "text-base sm:text-xs font-mono font-semibold truncate block", title: atomicSwap.total_price.toString() },
                    atomicSwap.total_price.toLocaleString(),
                    " sats"),
                react_1.default.createElement("span", { className: "text-xs font-mono text-secondary truncate block", title: atomicSwap.total_price.toString() },
                    "$",
                    (atomicSwap.total_price * 10 ** -8 * btcPrice).toLocaleString()))),
        react_1.default.createElement("div", { className: "flex justify-between items-center md:flex-col md:w-1/5 md:items-start md:m-auto" },
            react_1.default.createElement("span", { className: "text-sm font-medium text-secondary md:hidden" }, "Date"),
            react_1.default.createElement("span", { className: "text-base sm:text-xs font-mono truncate", title: new Date(atomicSwap.timestamp).toLocaleString() }, new Date(atomicSwap.timestamp).toLocaleDateString())),
        react_1.default.createElement("div", { className: "flex justify-between items-center md:flex-col md:w-1/5 md:items-start md:m-auto" },
            react_1.default.createElement("span", { className: "text-sm font-medium text-secondary md:hidden" }, "Transaction"),
            react_1.default.createElement("a", { href: `https://horizon.market/explorer/tx/${atomicSwap.txid}`, target: "_blank", rel: "noopener noreferrer", className: "text-xs font-mono truncate text-primary hover:underline", title: atomicSwap.txid }, (0, index_js_1.short_address)(atomicSwap.txid)))));
}
exports.RecentSalesAtomicSwapItem = (0, react_2.memo)(RecentSalesAtomicSwapItemComponent);
