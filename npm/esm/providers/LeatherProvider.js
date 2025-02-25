// src/providers/LeatherProvider.ts
// Importa el archivo para asegurarte de que Deno lo procese
import * as dntShim from "../_dnt.shims.js";
import "@/types/global.d.ts";
export const connectLeatherWallet = async () => {
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
export const signMessageWithLeather = async (message) => {
    const { result } = await globalThis.LeatherProvider.request("signMessage", {
        message,
        paymentType: "p2wpkh",
        network: "mainnet",
    });
    return result.signature;
};
export const signPSBTWithLeather = async (psbt, options) => {
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
export const pushTXWithLeather = async (txHex) => {
    return await pushTXMempool(txHex);
};
