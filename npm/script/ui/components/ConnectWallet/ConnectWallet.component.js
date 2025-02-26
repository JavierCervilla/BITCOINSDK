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
exports.ConnectWalletButton = void 0;
const react_1 = __importDefault(require("react"));
const lucide_react_1 = require("lucide-react");
const DropdownMenu = __importStar(require("@radix-ui/react-dropdown-menu"));
const walletContext_js_1 = require("../../context/walletContext.js");
function shortenAddress(address) {
    return `${address.slice(0, 6)}...${address.slice(-6)}`;
}
function ConnectWalletButton({ className, wallets, }) {
    const { walletAddress, connected, connectWallet, disconnectWallet } = (0, walletContext_js_1.useWallet)();
    return (react_1.default.createElement("div", null, !connected ? (react_1.default.createElement(DropdownMenu.Root, null,
        react_1.default.createElement(DropdownMenu.Trigger, { asChild: true },
            react_1.default.createElement("button", { type: "button", className: className },
                react_1.default.createElement(lucide_react_1.Wallet, { className: "w-5 h-5" }),
                react_1.default.createElement("span", null, "Connect Wallet"))),
        react_1.default.createElement(DropdownMenu.Portal, null,
            react_1.default.createElement(DropdownMenu.Content, { className: "z-50 min-w-[12rem] overflow-hidden rounded-xl border border-primary bg-light p-1 shadow-md", sideOffset: 5 }, Object.entries(wallets).map(([key, { label, icon }], index) => (react_1.default.createElement(DropdownMenu.Item, { key: key, onClick: async () => await connectWallet(key), className: `flex items-center px-4 py-3 text-sm font-medium cursor-pointer hover:bg-primary hover:border-none hover:text-light text-primary transition-all duration-300 ease-in-out transform hover:scale-105 ${index < Object.entries(wallets).length - 1 ? "border-b border-primary" : ""}` },
                react_1.default.createElement("img", { src: icon || "/placeholder.svg", alt: label, className: "w-6 h-6 mr-3" }),
                react_1.default.createElement("span", null, label)))))))) : (react_1.default.createElement("div", { className: "flex items-center gap-3 z-10" },
        react_1.default.createElement("div", { className: "px-6 py-3 text-sm font-medium border rounded-lg bg-light text-dark border-primary" }, shortenAddress(walletAddress)),
        react_1.default.createElement("button", { type: "button", onClick: disconnectWallet, className: "flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl shadow-md bg-primary text-light cursor-pointer hover:bg-hover transition-all duration-300 ease-in-out transform hover:scale-105" },
            react_1.default.createElement(lucide_react_1.LogOut, { className: "w-5 h-5" }))))));
}
exports.ConnectWalletButton = ConnectWalletButton;
exports.default = ConnectWalletButton;
