// src/providers/OKXProvider.ts

import type { connectWalletReturn } from "@/WalletConnect/index.ts";
import type { signPSBTOptions } from "@/WalletConnect/context/walletContext.tsx";

export const connectOKXWallet = async (): Promise<connectWalletReturn | null> => {
  if (typeof globalThis !== "undefined" && globalThis.okxwallet) {
    try {
      const result = await globalThis.okxwallet.bitcoin.connect();
      return result;
    } catch (error) {
      console.error("Error connecting to OKX Wallet:", error);
      return null;
    }
  } else {
    throw new Error("OKX Wallet not installed");
  }
};

export const signMessageWithOKX = async (message: string) => {
  const okx = globalThis.okxwallet;
  const signature = await okx.bitcoin.signMessage(message);
  return signature;
};

export const signPSBTWithOKX = async (
  psbt: string,
  options: signPSBTOptions,
): Promise<string | null> => {
  if (typeof globalThis !== "undefined" && globalThis.okxwallet && globalThis.okxwallet.bitcoin) {
    try {
      if (options) {
        const opt = {}
        if ("autoFinalized" in options) opt.autoFinalized =options.autoFinalized;
        if ("inputsToSign" in options) opt.toSignInputs= options.inputsToSign;
        const signedPsbt = await globalThis.okxwallet.bitcoin.signPsbt(psbt, opt);
        return signedPsbt;
      }
      const signedPsbt = await globalThis.okxwallet.bitcoin.signPsbt(psbt);
      return signedPsbt;
    } catch (error) {
      console.error("Error signing PSBT with OKX Wallet:", error);
      return null;
    }
  } else {
    throw new Error("OKX Wallet not installed");
  }
};

export const pushTXOKX = async (txHex: string): Promise<string | null> => {
  if (typeof globalThis !== "undefined" && globalThis.unisat) {
    try {
      const txId = await globalThis.okxwallet.bitcoin.pushPsbt(txHex);
      return txId;
    } catch (error) {
      console.error("Error pushing TX with Unisat Wallet:", error);
      return null;
    }
  } else {
    throw new Error("Unisat Wallet not installed");
  }
};
