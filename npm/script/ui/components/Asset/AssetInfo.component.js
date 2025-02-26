"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetInfo = void 0;
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const lucide_react_1 = require("lucide-react");
const index_js_1 = require("../../../core/index.js");
function AssetInfo({ asset }) {
    const [holders, setHolders] = (0, react_2.useState)(0);
    (0, react_2.useEffect)(() => {
        index_js_1.bitcoinsdk.counterparty.getHoldersCount({ asset: asset?.asset }).then((data) => {
            setHolders(data);
        });
    }, [asset]);
    return (react_1.default.createElement("div", { className: "flex flex-col" },
        react_1.default.createElement("div", { id: "description", className: "border-primary border-b p-2" },
            react_1.default.createElement("div", { className: "text-primary flex items-center gap-2 font-bold text-md" },
                react_1.default.createElement("h4", null, "Description"),
                asset?.description_locked || asset?.locked ?
                    react_1.default.createElement(lucide_react_1.Lock, { className: "w-4 h-4" })
                    :
                        react_1.default.createElement(lucide_react_1.Unlock, { className: "w-4 h-4" })),
            react_1.default.createElement("p", { className: "text-sm text-secondary truncate" }, asset?.description)),
        react_1.default.createElement("div", { id: "general-info", className: "flex gap-2 justify-between p-2" },
            react_1.default.createElement("div", { id: "supply", className: "text-primary flex flex-col font-bold text-md " },
                react_1.default.createElement("h4", { className: "text-secondary" }, "Supply"),
                react_1.default.createElement("p", { className: "text-xs text-primary truncate" }, Number(asset?.supply_normalized).toLocaleString())),
            react_1.default.createElement("div", { id: "supply", className: "flex items-center justify-between rounded-lg p-2 shadow-sm" },
                react_1.default.createElement("div", { className: "flex items-center space-x-2" },
                    react_1.default.createElement("span", { className: "text-primary font-bold text-sm" }, asset?.locked ? "Locked" : "Unlocked"),
                    asset?.locked ? react_1.default.createElement(lucide_react_1.Lock, { className: "w-4 h-4 text-primary" }) : react_1.default.createElement(lucide_react_1.Unlock, { className: "w-4 h-4 text-primary" }))),
            react_1.default.createElement("div", { id: "holders", className: "text-primary flex flex-col font-bold text-md " },
                react_1.default.createElement("h4", { className: "text-secondary" }, "Holders"),
                react_1.default.createElement("p", { className: "text-xs text-primary truncate" }, holders)))));
}
exports.AssetInfo = AssetInfo;
