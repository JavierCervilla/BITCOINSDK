import { bitcoinsdk } from "../../core/index.ts";

import type { SignPSBTOptions } from "../context/walletContext.ts";
import type { ConnectWalletReturn } from "./index.ts";

export const connectWallet = async (): Promise<ConnectWalletReturn | null> => {
  const okxwallet = (globalThis as GlobalThis).okxwallet;
  if (typeof globalThis !== "undefined" && okxwallet) {
    try {
      const result = await okxwallet.bitcoin.connect();
      return result;
    } catch (error) {
      console.error("Error connecting to OKX Wallet:", error);
      return null;
    }
  } else {
    throw new Error("OKX Wallet not installed");
  }
};

export const signMessage = async (message: string) => {
  const okxwallet = (globalThis as GlobalThis).okxwallet;
  if (typeof globalThis !== "undefined" && okxwallet) {
    const signature = await okxwallet.bitcoin.signMessage(message);
    return signature;
  }
  throw new Error("OKX Wallet not installed");
};

export const signPSBT = async (
  psbt: string,
  options: SignPSBTOptions,
): Promise<string | null> => {
  const okxwallet = (globalThis as GlobalThis).okxwallet;
  if (typeof globalThis !== "undefined" && okxwallet && okxwallet.bitcoin) {
    try {
      if (options) {
        const opt = {}
        if ("autoFinalized" in options) opt.autoFinalized =options.autoFinalized;
        if ("inputsToSign" in options) opt.toSignInputs= options.inputsToSign;
        const signedPsbt = await okxwallet.bitcoin.signPsbt(psbt, opt);
        return signedPsbt;
      }
      const signedPsbt = await okxwallet.bitcoin.signPsbt(psbt);
      return signedPsbt;
    } catch (error) {
      console.error("Error signing PSBT with OKX Wallet:", error);
      return null;
    }
  } else {
    throw new Error("OKX Wallet not installed");
  }
};

export const pushTX = async (txHex: string) => {
  return await bitcoinsdk.bitcoin.sendRawTransaction({ txHex });
};
