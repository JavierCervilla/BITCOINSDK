"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtomicSwapItem = void 0;
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const index_js_1 = require("../../../../index.js");
const index_js_2 = require("../../../../utils/index.js");
const CancelOrder_component_js_1 = require("../../Balance/actions/CancelOrder.component.js");
const ConnectWalletAction_component_js_1 = require("../../../ConnectWallet/ConnectWalletAction.component.js");
const UTXOBuy_component_js_1 = require("../../Balance/actions/UTXOBuy.component.js");
function AtomicSwapItemComponent({ atomicSwap, btcPrice }) {
    const { walletAddress } = (0, index_js_1.useWallet)();
    return (react_1.default.createElement("div", { className: "flex flex-col p-4 space-y-4 transition-colors border rounded-lg border-primary md:flex-row md:space-y-0 md:gap-2 md:justify-between" },
        react_1.default.createElement("div", { className: "flex justify-between items-center md:flex-col md:w-1/5 md:items-start md:m-auto" },
            react_1.default.createElement("span", { className: "text-sm font-medium text-secondary md:hidden" }, "Quantity"),
            react_1.default.createElement("div", { className: "text-right md:text-left" }, atomicSwap.utxo_balance.map((balance) => (react_1.default.createElement("span", { key: balance.assetId, className: "text-base sm:text-xs font-mono font-semibold truncate", title: balance.qty.toString() }, Number(balance.qty).toLocaleString()))))),
        react_1.default.createElement("div", { className: "flex justify-between items-center md:flex-col md:w-1/5 md:items-start md:m-auto" },
            react_1.default.createElement("span", { className: "text-sm font-medium text-secondary md:hidden" }, "Price"),
            react_1.default.createElement("div", { className: "text-right md:text-left" },
                react_1.default.createElement("span", { className: "text-base sm:text-xs font-mono font-semibold truncate block", title: atomicSwap.price.toString() },
                    atomicSwap.price.toLocaleString(),
                    " sats"),
                react_1.default.createElement("span", { className: "text-xs font-mono text-secondary truncate block", title: atomicSwap.price.toString() },
                    "$",
                    (atomicSwap.price * 10 ** -8 * btcPrice).toLocaleString()))),
        react_1.default.createElement("div", { className: "flex justify-between items-center md:flex-col md:w-1/5 md:items-start md:m-auto" },
            react_1.default.createElement("span", { className: "text-sm font-medium text-secondary md:hidden" }, "Seller"),
            react_1.default.createElement("span", { className: "text-base sm:text-xs font-mono truncate", title: atomicSwap.seller }, (0, index_js_2.short_address)(atomicSwap.seller))),
        react_1.default.createElement("div", { className: "flex justify-between items-center md:flex-col md:w-1/5 md:items-start md:m-auto" },
            react_1.default.createElement("span", { className: "text-sm font-medium text-secondary md:hidden" }, "Date"),
            react_1.default.createElement("span", { className: "text-base sm:text-xs font-mono truncate", title: new Date(Number(atomicSwap.timestamp) * 1000).toLocaleString() }, new Date(Number(atomicSwap.timestamp) * 1000).toLocaleDateString())),
        react_1.default.createElement("div", { className: "flex justify-between items-center md:flex-col md:w-1/5 md:items-start md:m-auto" },
            react_1.default.createElement("span", { className: "text-sm font-medium text-secondary md:hidden" }, "Action"),
            walletAddress && walletAddress === atomicSwap.seller && atomicSwap.status === "active" && (react_1.default.createElement(CancelOrder_component_js_1.CancelOrderAction, { order: atomicSwap })),
            walletAddress && walletAddress !== atomicSwap.seller && atomicSwap.status === "active" && (react_1.default.createElement(UTXOBuy_component_js_1.UTXOBuyOrderAction, { order: atomicSwap })),
            !walletAddress && (react_1.default.createElement(ConnectWalletAction_component_js_1.ConnectWalletAction, null)),
            atomicSwap.status !== "active" && (react_1.default.createElement("span", { className: "w-full capitalize ml-10 sm:ml-2 text-sm text-primary rounded-lg p-2 bg-warning border border-primary text-light bg-primary transition-colors text-center font-mono truncate" }, atomicSwap.status)))));
}
exports.AtomicSwapItem = (0, react_2.memo)(AtomicSwapItemComponent);
