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
exports.pushTXUnisat = exports.signPSBTWithUnisat = exports.signMessageWithUnisat = exports.connectUnisatWallet = void 0;
// src/providers/UnisatProvider.ts
const dntShim = __importStar(require("../_dnt.shims.js"));
const connectUnisatWallet = async () => {
    if (typeof dntShim.dntGlobalThis !== "undefined" && globalThis.unisat) {
        try {
            const accounts = await globalThis.unisat.requestAccounts();
            const address = accounts[0];
            const publicKey = await globalThis.unisat.getPublicKey();
            return { address, publicKey };
        }
        catch (error) {
            console.error("Error connecting to Unisat Wallet:", error);
            return null;
        }
    }
    else {
        throw new Error("Unisat Wallet not installed");
    }
};
exports.connectUnisatWallet = connectUnisatWallet;
const signMessageWithUnisat = async (message) => {
    const unisat = globalThis.unisat;
    const signature = await unisat.signMessage(message);
    return signature;
};
exports.signMessageWithUnisat = signMessageWithUnisat;
const signPSBTWithUnisat = async (psbt, options) => {
    if (typeof dntShim.dntGlobalThis !== "undefined" && globalThis.unisat) {
        try {
            if (options) {
                const opt = {};
                console.log(options);
                if ("autoFinalized" in options)
                    opt.autoFinalized = options.autoFinalized;
                if ("inputsToSign" in options)
                    opt.toSignInputs = options.inputsToSign;
                const signedPsbt = await globalThis.unisat.signPsbt(psbt, opt);
                return signedPsbt;
            }
            const signedPsbt = await globalThis.unisat.signPsbt(psbt);
            return signedPsbt;
        }
        catch (error) {
            console.error("Error signing PSBT with Unisat Wallet:", error);
            return null;
        }
    }
    else {
        throw new Error("Unisat Wallet not installed");
    }
};
exports.signPSBTWithUnisat = signPSBTWithUnisat;
const pushTXUnisat = async (txHex) => {
    if (typeof dntShim.dntGlobalThis !== "undefined" && globalThis.unisat) {
        try {
            const txId = await globalThis.unisat.pushPsbt(txHex);
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
exports.pushTXUnisat = pushTXUnisat;
