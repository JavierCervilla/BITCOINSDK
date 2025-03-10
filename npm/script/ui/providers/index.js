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
Object.defineProperty(exports, "__esModule", { value: true });
exports.walletConfig = exports.UNIVERSE_WALLET_LABEL = void 0;
const LeatherProvider = __importStar(require("./LeatherProvider.js"));
const UnisatProvider = __importStar(require("./UnisatProvider.js"));
const OKXProvider = __importStar(require("./OKXProvider.js"));
const TapWalletProvider = __importStar(require("./TapWalletProvider.js"));
const index_js_1 = require("../../assets/index.js");
exports.UNIVERSE_WALLET_LABEL = "🆄🅽🅸🆅🅴🆁🆂🅴";
exports.walletConfig = {
    Leather: {
        label: 'Leather',
        icon: index_js_1.leatherImg,
        connect: LeatherProvider.connectWallet,
        signMessage: LeatherProvider.signMessage,
        signPSBT: LeatherProvider.signPSBT,
        pushTX: LeatherProvider.pushTX,
    },
    Unisat: {
        label: 'Unisat',
        icon: index_js_1.unisatImg,
        connect: UnisatProvider.connectWallet,
        signMessage: UnisatProvider.signMessage,
        signPSBT: UnisatProvider.signPSBT,
        pushTX: UnisatProvider.pushTX,
    },
    OKX: {
        label: 'OKX',
        icon: index_js_1.okxImg,
        connect: OKXProvider.connectWallet,
        signMessage: OKXProvider.signMessage,
        signPSBT: OKXProvider.signPSBT,
        pushTX: OKXProvider.pushTX,
    },
    "🆄🅽🅸🆅🅴🆁🆂🅴": {
        label: exports.UNIVERSE_WALLET_LABEL,
        icon: index_js_1.tapWalletImg,
        connect: TapWalletProvider.connectWallet,
        signMessage: TapWalletProvider.signMessage,
        signPSBT: TapWalletProvider.signPSBT,
        pushTX: TapWalletProvider.pushTX,
    },
};
