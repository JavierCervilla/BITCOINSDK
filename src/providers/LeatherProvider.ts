// src/providers/LeatherProvider.ts
// Importa el archivo para asegurarte de que Deno lo procese
import "@/types/global.d.ts";
import type { ConnectWalletReturn } from "@/index.ts";
import type { SignPSBTOptions } from "@/context/walletContext.tsx";

type leatherAccount = {
  address: string;
  type: string;
  derivationPath: string;
  publicKey: string;
  symbol: string;
}


export const connectLeatherWallet = async (): Promise<ConnectWalletReturn | null> => {
  if (typeof globalThis !== "undefined" && globalThis.LeatherProvider) {
    try {
      const { result } = await globalThis.LeatherProvider.request("getAddresses");
      const address = result.addresses.find((account: leatherAccount) => account.type === 'p2wpkh').address;
      const publicKey = result.addresses.find((account: leatherAccount) => account.type === 'p2wpkh').publicKey;
      return { address, publicKey };
    } catch (error) {
      console.error("Error connecting to Leather Wallet:", error);
      return null;
    }
  } else {
    throw new Error("Leather Wallet not installed");
  }
};

export const signMessageWithLeather = async (message: string) => {
  const { result } = await globalThis.LeatherProvider.request(
    "signMessage",
    {
      message,
      paymentType: "p2wpkh",
      network: "mainnet",
    },
  );
  return result.signature;
};


export const signPSBTWithLeather = async (
  psbt: string,
  options: SignPSBTOptions,
): Promise<string | null> => {
  if (typeof globalThis !== "undefined" && globalThis.LeatherProvider) {
    try {
      const { inputsToSign, broadcast } = options;
      const requestParams: LeatherProvider.SignPsbtRequestParams = {
        hex: psbt,
        broadcast: broadcast,
      };
      if (options && inputsToSign) {
        requestParams.allowedSighash = inputsToSign[0].sighashTypes
        requestParams.signAtIndex = inputsToSign.map((input) => input.index)
      }
      console.log({requestParams})
      const signedPsbt = await globalThis.LeatherProvider.request('signPsbt', requestParams);
      console.log({signedPsbt})
      return signedPsbt.result.hex;
    } catch (error) {
      console.error("Error signing PSBT with Leather Wallet:", error);
      return null;
    }
  } else {
    throw new Error("Leather Wallet not installed");
  }
};

export const pushTXWithLeather = async (txHex: string) => {
  return await pushTXMempool(txHex);
};
