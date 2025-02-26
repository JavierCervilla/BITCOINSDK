import * as dntShim from "../../_dnt.shims.js";
import bitcoinsdk from "../../core/index.js";
export const connectWallet = async () => {
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
export const signMessage = async (message) => {
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
export const signPSBT = async (psbt, options) => {
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
export const pushTX = async (txHex) => {
    return await bitcoinsdk.bitcoin.sendRawTransaction({ txHex });
};
