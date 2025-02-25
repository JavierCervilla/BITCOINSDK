"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.walletConfig = exports.ConnectWalletButton = exports.useWallet = exports.WalletProvider = exports.UNIVERSE_WALLET_LABEL = void 0;
const walletContext_js_1 = require("./context/walletContext.js");
Object.defineProperty(exports, "WalletProvider", { enumerable: true, get: function () { return walletContext_js_1.WalletProvider; } });
Object.defineProperty(exports, "useWallet", { enumerable: true, get: function () { return walletContext_js_1.useWallet; } });
const ConnectWallet_component_tsx_1 = __importDefault(require("@/components/ConnectWallet/ConnectWallet.component.tsx"));
exports.ConnectWalletButton = ConnectWallet_component_tsx_1.default;
const LeatherProvider_js_1 = require("./providers/LeatherProvider.js");
const UnisatProvider_js_1 = require("./providers/UnisatProvider.js");
const OKXProvider_js_1 = require("./providers/OKXProvider.js");
const TapWalletProvider_js_1 = require("./providers/TapWalletProvider.js");
const index_ts_1 = require("@/assets/index.ts");
exports.UNIVERSE_WALLET_LABEL = "🆄🅽🅸🆅🅴🆁🆂🅴";
const walletConfig = {
    Leather: {
        label: 'Leather',
        icon: index_ts_1.leatherImg,
        connect: LeatherProvider_js_1.connectLeatherWallet,
        signMessage: LeatherProvider_js_1.signMessageWithLeather,
        signPSBT: LeatherProvider_js_1.signPSBTWithLeather,
        pushTX: LeatherProvider_js_1.pushTXWithLeather,
    },
    Unisat: {
        label: 'Unisat',
        icon: index_ts_1.unisatImg,
        connect: UnisatProvider_js_1.connectUnisatWallet,
        signMessage: UnisatProvider_js_1.signMessageWithUnisat,
        signPSBT: UnisatProvider_js_1.signPSBTWithUnisat,
        pushTX: UnisatProvider_js_1.pushTXUnisat,
    },
    OKX: {
        label: 'OKX',
        icon: index_ts_1.okxImg,
        connect: OKXProvider_js_1.connectOKXWallet,
        signMessage: OKXProvider_js_1.signMessageWithOKX,
        signPSBT: OKXProvider_js_1.signPSBTWithOKX,
        pushTX: OKXProvider_js_1.pushTXOKX,
    },
    "🆄🅽🅸🆅🅴🆁🆂🅴": {
        label: exports.UNIVERSE_WALLET_LABEL,
        icon: index_ts_1.tapWalletImg,
        connect: TapWalletProvider_js_1.connectTapWallet,
        signMessage: TapWalletProvider_js_1.signMessageWithTapWallet,
        signPSBT: TapWalletProvider_js_1.signPSBTWithTapWallet,
        pushTX: TapWalletProvider_js_1.pushTXTapWallet,
    },
};
exports.walletConfig = walletConfig;
