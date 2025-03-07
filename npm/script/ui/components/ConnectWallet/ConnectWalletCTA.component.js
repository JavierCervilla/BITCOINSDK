"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectWalletCTA = void 0;
const react_1 = __importDefault(require("react"));
const index_js_1 = require("../../index.js");
const ConnectWallet_component_js_1 = __importDefault(require("./ConnectWallet.component.js"));
function ConnectWalletCTA() {
    return (react_1.default.createElement("section", { className: "mt-8 p-6 flex flex-col items-center justify-center gap-6 border border-primary rounded-xl text-center w-full max-w-lg mx-auto transition-all duration-300 ease-in-out" },
        react_1.default.createElement("div", { className: "space-y-2" },
            react_1.default.createElement("h3", { className: "text-2xl font-bold text-primary" }, "Connect Your Wallet"),
            react_1.default.createElement("p", { className: "text-muted-foreground" }, "Start trading in seconds")),
        react_1.default.createElement(ConnectWallet_component_js_1.default, { className: "cursor-pointer w-full py-4 px-8 text-base md:text-2xl tracking-wider bg-light text-primary border border-primary rounded-lg font-semibold flex items-center justify-center gap-2 duration-300 ease-in-out transition-all hover:bg-primary hover:text-light hover:scale-105", wallets: index_js_1.walletConfig })));
}
exports.ConnectWalletCTA = ConnectWalletCTA;
