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
exports.pushTX = exports.signPSBT = exports.signMessage = exports.connectWallet = void 0;
const dntShim = __importStar(require("../../_dnt.shims.js"));
const index_js_1 = require("../../core/index.js");
const connectWallet = async () => {
    const tapwallet = dntShim.dntGlobalThis.tapwallet;
    if (typeof dntShim.dntGlobalThis !== "undefined" && tapwallet) {
        try {
            const accounts = await tapwallet.requestAccounts();
            const address = accounts[0];
            const publicKey = await tapwallet.getPublicKey();
            return { address, publicKey };
        }
        catch (error) {
            console.error("Error connecting to TapWallet:", error);
            return null;
        }
    }
    else {
        throw new Error("TapWallet not installed");
    }
};
exports.connectWallet = connectWallet;
const signMessage = async (message) => {
    const tapwallet = dntShim.dntGlobalThis.tapwallet;
    if (typeof dntShim.dntGlobalThis !== "undefined" && tapwallet) {
        try {
            const signature = await tapwallet.signMessage(message);
            return signature;
        }
        catch (error) {
            console.error("Error signing message with TapWallet:", error);
            return null;
        }
    }
    else {
        throw new Error("TapWallet not installed");
    }
};
exports.signMessage = signMessage;
const signPSBT = async (psbt, options) => {
    const tapwallet = dntShim.dntGlobalThis.tapwallet;
    if (typeof dntShim.dntGlobalThis !== "undefined" && tapwallet) {
        try {
            if (options) {
                const opt = {};
                if ("autoFinalized" in options)
                    opt.autoFinalized = options.autoFinalized;
                if ("inputsToSign" in options)
                    opt.toSignInputs = options.inputsToSign;
                const signedPsbt = await tapwallet.signPsbt(psbt, opt);
                return signedPsbt;
            }
            const signedPsbt = await tapwallet.signPsbt(psbt);
            return signedPsbt;
        }
        catch (error) {
            console.error("Error signing PSBT with TapWallet:", error);
            return null;
        }
    }
    else {
        throw new Error("TapWallet not installed");
    }
};
exports.signPSBT = signPSBT;
const pushTX = async (txHex) => {
    return await index_js_1.bitcoinsdk.bitcoin.sendRawTransaction({ txHex });
};
exports.pushTX = pushTX;
