// src/providers/UnisatProvider.ts
import * as dntShim from "../../_dnt.shims.js";


import type { ConnectWalletReturn } from "./index.js";

export const connectWallet = async (): Promise<ConnectWalletReturn | null> => {
  if (typeof dntShim.dntGlobalThis !== "undefined" && globalThis.unisat) {
    try {
      const accounts = await globalThis.unisat.requestAccounts();
      const address = accounts[0];
      const publicKey = await globalThis.unisat.getPublicKey()
      return { address, publicKey }
    } catch (error) {
      console.error("Error connecting to Unisat Wallet:", error);
      return null;
    }
  } else {
    throw new Error("Unisat Wallet not installed");
  }
};

export const signMessage = async (message: string) => {
  const unisat = globalThis.unisat;
  const signature = await unisat.signMessage(message);
  return signature;
}



export const signPSBT = async (
  psbt: string,
  options: signPSBTOptions): Promise<string | null> => {
  if (typeof dntShim.dntGlobalThis !== "undefined" && globalThis.unisat) {
    try {
      if (options) {
        const opt = {};
        console.log(options)
        if ("autoFinalized" in options) opt.autoFinalized = options.autoFinalized;
        if ("inputsToSign" in options) opt.toSignInputs = options.inputsToSign;
        const signedPsbt = await globalThis.unisat.signPsbt(psbt, opt);
        return signedPsbt;
      }
      const signedPsbt = await globalThis.unisat.signPsbt(psbt);
      return signedPsbt;
    } catch (error) {
      console.error("Error signing PSBT with Unisat Wallet:", error);
      return null;
    }
  } else {
    throw new Error("Unisat Wallet not installed");
  }
};

export const pushTX = async (txHex: string): Promise<string | null> => {
  if (typeof dntShim.dntGlobalThis !== "undefined" && globalThis.unisat) {
    try {
      const txId = await globalThis.unisat.pushPsbt(txHex);
      return txId;
    } catch (error) {
      console.error("Error pushing TX with Unisat Wallet:", error);
      return null;
    }
  } else {
    throw new Error("Unisat Wallet not installed");
  }
};
