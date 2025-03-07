"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecentSalesAtomicSwapList = void 0;
const dntShim = __importStar(require("../../../../../_dnt.shims.js"));
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const react_window_1 = require("react-window");
const AtomicSwapItem_component_js_1 = require("./AtomicSwapItem.component.js");
const Loader_component_js_1 = require("../../../Loader/Loader.component.js");
function RecentSalesAtomicSwapListComponent({ asset, swaps, isLoading, btcPrice }) {
    const ROW_HEIGHT = (0, react_2.useMemo)(() => {
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
        return react_1.default.createElement(Loader_component_js_1.Loader, null);
    }
    if (swaps.length === 0) {
        return (react_1.default.createElement("div", { className: "text-center py-4 text-secondary flex flex-col  gap-2" },
            react_1.default.createElement("span", { className: "text-sm font-medium" }, "No Atomic swaps sales available")));
    }
    return (react_1.default.createElement("div", { className: "flex flex-col  gap-2 max-h-[calc(100vh-200px)] md:max-h-[200px]" },
        react_1.default.createElement("div", { className: "flex flex-col gap-2 overflow-auto" },
            react_1.default.createElement("div", { className: "hidden md:flex flex-row justify-between items-center gap-2 p-2 bg-light border-b border-primary text-primary" },
                react_1.default.createElement("span", { className: "text-sm font-medium w-1/5" }, "Quantity"),
                react_1.default.createElement("span", { className: "text-sm font-medium w-1/5" }, "Unit Price"),
                react_1.default.createElement("span", { className: "text-sm font-medium w-1/5" }, "Price"),
                react_1.default.createElement("span", { className: "text-sm font-medium w-1/5" }, "Date"),
                react_1.default.createElement("span", { className: "text-sm font-medium w-1/5" }, "Tx")),
            react_1.default.createElement(react_window_1.FixedSizeList, { height: MAX_HEIGHT, itemCount: swaps.length, itemSize: ROW_HEIGHT, width: "100%" }, ({ index, style }) => {
                const swap = swaps[index];
                return (react_1.default.createElement("div", { style: style },
                    react_1.default.createElement(AtomicSwapItem_component_js_1.RecentSalesAtomicSwapItem, { btcPrice: btcPrice, key: swap.txid, atomicSwap: swap, asset: asset })));
            }))));
}
exports.RecentSalesAtomicSwapList = (0, react_2.memo)(RecentSalesAtomicSwapListComponent);
