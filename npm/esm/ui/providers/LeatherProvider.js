import * as dntShim from "../../_dnt.shims.js";
import bitcoinsdk from "../../core/index.js";
export const connectWallet = async () => {
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
export const signMessage = async (message) => {
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
export const signPSBT = async (psbt, options) => {
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
export const pushTX = async (txHex) => {
    return await bitcoinsdk.bitcoin.sendRawTransaction({ txHex });
};
