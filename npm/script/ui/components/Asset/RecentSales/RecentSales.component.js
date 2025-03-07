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
exports.RecentSales = void 0;
const react_1 = __importDefault(require("react"));
const Tabs = __importStar(require("@radix-ui/react-tabs"));
const react_2 = require("react");
const style_js_1 = require("../../../utils/style.js");
const DispenseList_component_js_1 = require("./Dispense/DispenseList.component.js");
const AtomicSwapList_component_js_1 = require("./AtomicSwaps/AtomicSwapList.component.js");
const Loader_component_js_1 = require("../../Loader/Loader.component.js");
const tabs = [
    { value: "swaps", label: "Atomic Swaps" },
    { value: "dispenses", label: "Dispenses" },
];
function RecentSalesComponent({ asset, btcPrice, swaps, dispenses, isLoading }) {
    const [activeTab, setActiveTab] = (0, react_2.useState)("swaps");
    const handleTabChange = (0, react_2.useCallback)((value) => {
        setActiveTab(value);
    }, []);
    if (isLoading) {
        return react_1.default.createElement(Loader_component_js_1.Loader, null);
    }
    return (react_1.default.createElement("div", { className: "bg-light p-4 rounded-lg shadow-md text-dark w-full border border-secondarysm:min-h-[calc(100vh-358px)] md:min-h-[358px]" },
        react_1.default.createElement("h2", { className: "font-bold text-lg" },
            react_1.default.createElement("span", { className: "text-primary" }, asset),
            " Recent Sales"),
        react_1.default.createElement(Tabs.Root, { value: activeTab, onValueChange: handleTabChange },
            react_1.default.createElement(Tabs.List, { className: "flex border-b border-secondary space-x-4" }, tabs.map((tab) => (react_1.default.createElement(Tabs.Trigger, { key: tab.value, value: tab.value, className: (0, style_js_1.cn)("p-2 text-secondary transition-all border-b-2 border-transparent cursor-pointer hover:text-primary", activeTab === tab.value ? "text-primary border-primary" : "text-secondary") }, tab.label)))),
            react_1.default.createElement(Tabs.Content, { value: "swaps", className: "mt-4 bg-light p-2 rounded-md text-dark text-sm" },
                react_1.default.createElement(AtomicSwapList_component_js_1.RecentSalesAtomicSwapList, { asset: asset, btcPrice: btcPrice, swaps: swaps, isLoading: isLoading })),
            react_1.default.createElement(Tabs.Content, { value: "dispenses", className: "mt-4 bg-light p-2 rounded-md text-dark text-sm" },
                react_1.default.createElement(DispenseList_component_js_1.DispensesList, { btcPrice: btcPrice, dispenses: dispenses, isLoading: isLoading })))));
}
exports.RecentSales = (0, react_2.memo)(RecentSalesComponent);
