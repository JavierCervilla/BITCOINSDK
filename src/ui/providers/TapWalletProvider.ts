import { bitcoinsdk } from "../../core/index.ts";

import type { SignPSBTOptions } from "../context/walletContext.ts";
import type { ConnectWalletReturn } from "./index.ts";

export const connectWallet = async (): Promise<ConnectWalletReturn | null> => {
  const tapwallet = (globalThis as GlobalThis).tapwallet;
  if (typeof globalThis !== "undefined" && tapwallet) {
    try {
      const accounts = await tapwallet.requestAccounts();
      const address = accounts[0];
      const publicKey = await tapwallet.getPublicKey()
      return { address, publicKey }
    } catch (error) {
      console.error("Error connecting to TapWallet:", error);
      return null;
    }
  } else {
    throw new Error("TapWallet not installed");
  }
};

export const signMessage = async (message: string) => {
  const tapwallet = (globalThis as GlobalThis).tapwallet;
  if (typeof globalThis !== "undefined" && tapwallet) {
    try {
      const signature = await tapwallet.signMessage(message);
      return signature;
    } catch (error) {
      console.error("Error signing message with TapWallet:", error);
      return null;
    }
  } else {
    throw new Error("TapWallet not installed");
  }
}



export const signPSBT = async (
  psbt: string,
  options: SignPSBTOptions): Promise<string | null> => {
  const tapwallet = (globalThis as GlobalThis).tapwallet;
  if (typeof globalThis !== "undefined" && tapwallet) {
    try {
      if (options) {
        const opt = {};
        if ("autoFinalized" in options) opt.autoFinalized = options.autoFinalized;
        if ("inputsToSign" in options) opt.toSignInputs = options.inputsToSign;
        const signedPsbt = await tapwallet.signPsbt(psbt, opt);
        return signedPsbt;
      }
      const signedPsbt = await tapwallet.signPsbt(psbt);
      return signedPsbt;
    } catch (error) {
      console.error("Error signing PSBT with TapWallet:", error);
      return null;
    }
  } else {
    throw new Error("TapWallet not installed");
  }
};

export const pushTX = async (txHex: string) => {
  return await bitcoinsdk.bitcoin.sendRawTransaction({ txHex });
};

