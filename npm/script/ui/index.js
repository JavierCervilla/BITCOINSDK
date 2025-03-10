"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UNIVERSE_WALLET_LABEL = exports.walletConfig = exports.ConnectWalletButton = exports.ConnectWalletButtonReact = exports.useWallet = exports.WalletManager = void 0;
const walletContext_js_1 = require("./context/walletContext.js");
Object.defineProperty(exports, "WalletManager", { enumerable: true, get: function () { return walletContext_js_1.WalletManager; } });
Object.defineProperty(exports, "useWallet", { enumerable: true, get: function () { return walletContext_js_1.useWallet; } });
const ConnectWallet_react_js_1 = __importDefault(require("./components/ConnectWallet/ConnectWallet.react.js"));
Object.defineProperty(exports, "ConnectWalletButtonReact", { enumerable: true, get: function () { return ConnectWallet_react_js_1.default; } });
const ConnectWallet_js_1 = require("./components/ConnectWallet/ConnectWallet.js");
Object.defineProperty(exports, "ConnectWalletButton", { enumerable: true, get: function () { return ConnectWallet_js_1.ConnectWalletButton; } });
const index_js_1 = require("./providers/index.js");
Object.defineProperty(exports, "walletConfig", { enumerable: true, get: function () { return index_js_1.walletConfig; } });
Object.defineProperty(exports, "UNIVERSE_WALLET_LABEL", { enumerable: true, get: function () { return index_js_1.UNIVERSE_WALLET_LABEL; } });
