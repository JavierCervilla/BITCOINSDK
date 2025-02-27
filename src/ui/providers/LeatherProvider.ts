import { bitcoinsdk } from "../../core/index.ts";

import LeatherProvider from "@leather-wallet/types"
import type { ConnectWalletReturn } from "../index.ts";
import type { SignPSBTOptions } from "../context/walletContext.tsx";



export const connectWallet = async (): Promise<ConnectWalletReturn | null> => {
  const LeatherProvider = (globalThis as GlobalThis).LeatherProvider;
  if (typeof globalThis !== "undefined" && LeatherProvider) {
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
    } catch (error) {
      console.error("Error connecting to Leather Wallet:", error);
      return null;
    }
  } else {
    throw new Error("Leather Wallet not installed");
  }
  return null;
};

export const signMessage = async (message: string) => {
  const LeatherProvider = (globalThis as GlobalThis).LeatherProvider;
  if (typeof globalThis !== "undefined" && LeatherProvider) {
    const { result } = await LeatherProvider.request(
      "signMessage",
      {
        message,
        paymentType: "p2wpkh",
        network: "mainnet",
      },
    );
    return result.signature;
  }
  throw new Error("Leather Wallet not installed");
};


export const signPSBT = async (
  psbt: string,
  options: SignPSBTOptions,
): Promise<string | null> => {
  const LeatherProvider = (globalThis as GlobalThis).LeatherProvider;
  if (typeof globalThis !== "undefined" && LeatherProvider) {
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
      const signedPsbt = await LeatherProvider.request('signPsbt', requestParams);
      return signedPsbt.result.hex;
    } catch (error) {
      console.error("Error signing PSBT with Leather Wallet:", error);
      return null;
    }
  } else {
    throw new Error("Leather Wallet not installed");
  }
};

export const pushTX = async (txHex: string) => {
  return await bitcoinsdk.bitcoin.sendRawTransaction({ txHex });
};
