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
exports.pushTXWithLeather = exports.signPSBTWithLeather = exports.signMessageWithLeather = exports.connectLeatherWallet = void 0;
// src/providers/LeatherProvider.ts
// Importa el archivo para asegurarte de que Deno lo procese
const dntShim = __importStar(require("../_dnt.shims.js"));
require("@/types/global.d.ts");
const connectLeatherWallet = async () => {
    if (typeof dntShim.dntGlobalThis !== "undefined" && globalThis.LeatherProvider) {
        try {
            const { result } = await globalThis.LeatherProvider.request("getAddresses");
            const address = result.addresses.find((account) => account.type === 'p2wpkh').address;
            const publicKey = result.addresses.find((account) => account.type === 'p2wpkh').publicKey;
            return { address, publicKey };
        }
        catch (error) {
            console.error("Error connecting to Leather Wallet:", error);
            return null;
        }
    }
    else {
        throw new Error("Leather Wallet not installed");
    }
};
exports.connectLeatherWallet = connectLeatherWallet;
const signMessageWithLeather = async (message) => {
    const { result } = await globalThis.LeatherProvider.request("signMessage", {
        message,
        paymentType: "p2wpkh",
        network: "mainnet",
    });
    return result.signature;
};
exports.signMessageWithLeather = signMessageWithLeather;
const signPSBTWithLeather = async (psbt, options) => {
    if (typeof dntShim.dntGlobalThis !== "undefined" && globalThis.LeatherProvider) {
        try {
            const { inputsToSign, broadcast } = options;
            const requestParams = {
                hex: psbt,
                broadcast: broadcast,
            };
            if (options && inputsToSign) {
                requestParams.allowedSighash = inputsToSign[0].sighashTypes;
                requestParams.signAtIndex = inputsToSign.map((input) => input.index);
            }
            console.log({ requestParams });
            const signedPsbt = await globalThis.LeatherProvider.request('signPsbt', requestParams);
            console.log({ signedPsbt });
            return signedPsbt.result.hex;
        }
        catch (error) {
            console.error("Error signing PSBT with Leather Wallet:", error);
            return null;
        }
    }
    else {
        throw new Error("Leather Wallet not installed");
    }
};
exports.signPSBTWithLeather = signPSBTWithLeather;
const pushTXWithLeather = async (txHex) => {
    return await pushTXMempool(txHex);
};
exports.pushTXWithLeather = pushTXWithLeather;
