import * as dntShim from "../../_dnt.shims.js";
import { bitcoinsdk } from "../../core/index.js";
export const connectWallet = async () => {
    const okxwallet = dntShim.dntGlobalThis.okxwallet;
    if (typeof dntShim.dntGlobalThis !== "undefined" && okxwallet) {
        try {
            const result = await okxwallet.bitcoin.connect();
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
export const signMessage = async (message) => {
    const okxwallet = dntShim.dntGlobalThis.okxwallet;
    if (typeof dntShim.dntGlobalThis !== "undefined" && okxwallet) {
        const signature = await okxwallet.bitcoin.signMessage(message);
        return signature;
    }
    throw new Error("OKX Wallet not installed");
};
export const signPSBT = async (psbt, options) => {
    const okxwallet = dntShim.dntGlobalThis.okxwallet;
    if (typeof dntShim.dntGlobalThis !== "undefined" && okxwallet && okxwallet.bitcoin) {
        try {
            if (options) {
                const opt = {};
                if ("autoFinalized" in options)
                    opt.autoFinalized = options.autoFinalized;
                if ("inputsToSign" in options)
                    opt.toSignInputs = options.inputsToSign;
                const signedPsbt = await okxwallet.bitcoin.signPsbt(psbt, opt);
                return signedPsbt;
            }
            const signedPsbt = await okxwallet.bitcoin.signPsbt(psbt);
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
export const pushTX = async (txHex) => {
    return await bitcoinsdk.bitcoin.sendRawTransaction({ txHex });
};
