"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DispenserItem = void 0;
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
function DispenserItemComponent({ dispenser, btcPrice }) {
    return (react_1.default.createElement("div", { className: "flex flex-col p-4 space-y-4 transition-colors border rounded-lg border-primary hover:bg-light/5 md:flex-row md:space-y-0 md:gap-2 md:justify-between" },
        react_1.default.createElement("div", { className: "flex justify-between items-center md:flex-col md:w-1/4 md:items-start md:m-auto" },
            react_1.default.createElement("span", { className: "text-sm font-medium text-secondary md:hidden" }, "Quantity"),
            react_1.default.createElement("div", { className: "text-right md:text-left" },
                react_1.default.createElement("span", { className: "text-base sm:text-xs font-mono font-semibold truncate", title: dispenser.give_quantity_normalized }, Number(dispenser.give_quantity_normalized).toLocaleString()))),
        react_1.default.createElement("div", { className: "flex justify-between items-center md:flex-col md:w-1/4 md:items-start md:m-auto" },
            react_1.default.createElement("span", { className: "text-sm font-medium text-secondary md:hidden" }, "Remaining"),
            react_1.default.createElement("div", { className: "text-right md:text-left" },
                react_1.default.createElement("span", { className: "text-base sm:text-xs font-mono font-semibold truncate", title: dispenser.give_remaining_normalized }, Number(dispenser.give_remaining_normalized).toLocaleString()))),
        react_1.default.createElement("div", { className: "flex justify-between items-center md:flex-col md:w-1/4 md:items-start md:m-auto" },
            react_1.default.createElement("span", { className: "text-sm font-medium text-secondary md:hidden" }, "Unit Price"),
            react_1.default.createElement("div", { className: "text-right md:text-left" },
                react_1.default.createElement("span", { className: "text-base sm:text-xs font-mono font-semibold truncate block", title: dispenser.price.toString() },
                    dispenser.satoshi_price.toLocaleString(),
                    " sats"),
                react_1.default.createElement("span", { className: "text-xs font-mono text-secondary truncate block", title: dispenser.price.toString() },
                    "$",
                    (dispenser.satoshi_price * 10 ** -8 * btcPrice).toLocaleString()))),
        react_1.default.createElement("div", { className: "flex justify-between items-center md:flex-col md:w-1/4 md:items-start md:m-auto" },
            react_1.default.createElement("span", { className: "text-sm font-medium text-secondary md:hidden" }, "Price"),
            react_1.default.createElement("div", { className: "text-right md:text-left" },
                react_1.default.createElement("span", { className: "text-base sm:text-xs font-mono font-semibold truncate block", title: dispenser.satoshirate.toString() },
                    dispenser.satoshirate.toLocaleString(),
                    " sats"),
                react_1.default.createElement("span", { className: "text-xs font-mono text-secondary truncate block", title: dispenser.price.toString() },
                    "$",
                    (dispenser.satoshirate * 10 ** -8 * btcPrice).toLocaleString()))),
        react_1.default.createElement("div", { className: "flex justify-between items-center md:flex-col md:w-1/4 md:items-start md:m-auto" },
            react_1.default.createElement("span", { className: "text-sm font-medium text-secondary md:hidden" }, "Date"),
            react_1.default.createElement("span", { className: "text-base sm:text-xs font-mono truncate", title: new Date(dispenser.block_time * 1000).toLocaleString() }, new Date(dispenser.block_time * 1000).toLocaleDateString()))));
}
exports.DispenserItem = (0, react_2.memo)(DispenserItemComponent);
