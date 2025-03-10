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
    const LeatherProvider = dntShim.dntGlobalThis.LeatherProvider;
    if (typeof dntShim.dntGlobalThis !== "undefined" && LeatherProvider) {
        try {
            const { result } = await LeatherProvider.request("getAddresses");
            if (result && result.addresses.length > 0) {
                const account = result.addresses.find((account) => account.type === 'p2wpkh');
                if (account) {
                    const address = account.address;
                    const publicKey = account.publicKey;
                    return { address, publicKey };
                }
            }
        }
        catch (error) {
            console.error("Error connecting to Leather Wallet:", error);
            return null;
        }
    }
    else {
        throw new Error("Leather Wallet not installed");
    }
    return null;
};
exports.connectWallet = connectWallet;
const signMessage = async (message) => {
    const LeatherProvider = dntShim.dntGlobalThis.LeatherProvider;
    if (typeof dntShim.dntGlobalThis !== "undefined" && LeatherProvider) {
        const { result } = await LeatherProvider.request("signMessage", {
            message,
            paymentType: "p2wpkh",
            network: "mainnet",
        });
        return result.signature;
    }
    throw new Error("Leather Wallet not installed");
};
exports.signMessage = signMessage;
const signPSBT = async (psbt, options) => {
    const LeatherProvider = dntShim.dntGlobalThis.LeatherProvider;
    if (typeof dntShim.dntGlobalThis !== "undefined" && LeatherProvider) {
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
            const signedPsbt = await LeatherProvider.request('signPsbt', requestParams);
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
exports.signPSBT = signPSBT;
const pushTX = async (txHex) => {
    return await index_js_1.bitcoinsdk.bitcoin.sendRawTransaction({ txHex });
};
exports.pushTX = pushTX;
