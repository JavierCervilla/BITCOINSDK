"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectWalletAction = void 0;
const react_1 = __importDefault(require("react"));
const index_js_1 = require("../../index.js");
const ConnectWallet_component_js_1 = __importDefault(require("./ConnectWallet.component.js"));
function ConnectWalletAction() {
    return (react_1.default.createElement(ConnectWallet_component_js_1.default, { buttonClassName: "text-primary cursor-pointer flex text-xs font-medium items-center gap-2 border border-primary rounded-lg px-2 py-0.5", dropdownClassName: "border border-primary bg-light text-black border border-primary", dropdownItemClassName: "text-black", wallets: index_js_1.walletConfig }));
}
exports.ConnectWalletAction = ConnectWalletAction;
