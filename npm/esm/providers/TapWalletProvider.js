// src/providers/TapWalletProvider.ts
import * as dntShim from "../_dnt.shims.js";
export const connectTapWallet = async () => {
    if (typeof dntShim.dntGlobalThis !== "undefined" && globalThis.tapwallet) {
        try {
            const accounts = await globalThis.tapwallet.requestAccounts();
            const address = accounts[0];
            const publicKey = await globalThis.tapwallet.getPublicKey();
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
export const signMessageWithTapWallet = async (message) => {
    const tapwallet = globalThis.tapwallet;
    const signature = await tapwallet.signMessage(message);
    return signature;
};
export const signPSBTWithTapWallet = async (psbt, options) => {
    if (typeof dntShim.dntGlobalThis !== "undefined" && globalThis.tapwallet) {
        try {
            if (options) {
                const opt = {};
                if ("autoFinalized" in options)
                    opt.autoFinalized = options.autoFinalized;
                if ("inputsToSign" in options)
                    opt.toSignInputs = options.inputsToSign;
                const signedPsbt = await globalThis.tapwallet.signPsbt(psbt, opt);
                return signedPsbt;
            }
            const signedPsbt = await globalThis.tapwallet.signPsbt(psbt);
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
export const pushTXTapWallet = async (txHex) => {
    if (typeof dntShim.dntGlobalThis !== "undefined" && globalThis.tapwallet) {
        try {
            const txId = await globalThis.tapwallet.pushPsbt(txHex);
            return txId;
        }
        catch (error) {
            console.error("Error pushing TX with TapWallet:", error);
            return null;
        }
    }
    else {
        throw new Error("TapWallet not installed");
    }
};
