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
exports.pushTXOKX = exports.signPSBTWithOKX = exports.signMessageWithOKX = exports.connectOKXWallet = void 0;
// src/providers/OKXProvider.ts
const dntShim = __importStar(require("../_dnt.shims.js"));
const connectOKXWallet = async () => {
    if (typeof dntShim.dntGlobalThis !== "undefined" && globalThis.okxwallet) {
        try {
            const result = await globalThis.okxwallet.bitcoin.connect();
            return result;
        }
        catch (error) {
            console.error("Error connecting to OKX Wallet:", error);
            return null;
        }
    }
    else {
        throw new Error("OKX Wallet not installed");
    }
};
exports.connectOKXWallet = connectOKXWallet;
const signMessageWithOKX = async (message) => {
    const okx = globalThis.okxwallet;
    const signature = await okx.bitcoin.signMessage(message);
    return signature;
};
exports.signMessageWithOKX = signMessageWithOKX;
const signPSBTWithOKX = async (psbt, options) => {
    if (typeof dntShim.dntGlobalThis !== "undefined" && globalThis.okxwallet && globalThis.okxwallet.bitcoin) {
        try {
            if (options) {
                const opt = {};
                if ("autoFinalized" in options)
                    opt.autoFinalized = options.autoFinalized;
                if ("inputsToSign" in options)
                    opt.toSignInputs = options.inputsToSign;
                const signedPsbt = await globalThis.okxwallet.bitcoin.signPsbt(psbt, opt);
                return signedPsbt;
            }
            const signedPsbt = await globalThis.okxwallet.bitcoin.signPsbt(psbt);
            return signedPsbt;
        }
        catch (error) {
            console.error("Error signing PSBT with OKX Wallet:", error);
            return null;
        }
    }
    else {
        throw new Error("OKX Wallet not installed");
    }
};
exports.signPSBTWithOKX = signPSBTWithOKX;
const pushTXOKX = async (txHex) => {
    if (typeof dntShim.dntGlobalThis !== "undefined" && globalThis.unisat) {
        try {
            const txId = await globalThis.okxwallet.bitcoin.pushPsbt(txHex);
            return txId;
        }
        catch (error) {
            console.error("Error pushing TX with Unisat Wallet:", error);
            return null;
        }
    }
    else {
        throw new Error("Unisat Wallet not installed");
    }
};
exports.pushTXOKX = pushTXOKX;
