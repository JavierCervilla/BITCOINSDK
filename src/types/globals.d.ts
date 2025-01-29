// src/types/global.d.ts
import type { LeatherProvider } from '@leather-wallet/types';
import type { InputToSign } from "@/WalletConnect/context/walletContext.tsx";


// Extiende la interfaz global de Window para agregar LeatherProvider, unisat y okxwallet
declare global {
  interface TapWallet {
    requestAccounts: () => Promise<string[]>;
    signMessage: (message: string) => Promise<string>;
    getPublicKey: () => Promise<string>;
    signPsbt: (
      psbt: string,
      options?: { autoFinalized?: boolean; toSignInputs?: InputToSign[] }
    ) => Promise<string>;
  }

  interface Unisat {
    requestAccounts: () => Promise<string[]>;
    signPsbt: (psbt: string, options?: { toSignInputs: InputToSign[] }) => Promise<string>;
    signMessage: (message: string) => Promise<string>;
    getPublicKey: () => Promise<string>;
  }

  interface OkxWallet {
    bitcoin: {
      connect: () => Promise<{ address: string; publicKey: string }>;
      requestAccounts: () => Promise<string[]>;
      signMessage: (message: string) => Promise<string>;
      getPublicKey: () => Promise<string>;
      signPsbt: (psbt: string, options?: { autoFinalized: boolean, toSignInputs: InputToSign[] }) => Promise<string>;
    };
  }

  interface globalThis {
    LeatherProvider?: LeatherProvider;
    unisat?: Unisat;
    okxwallet?: OkxWallet;
    tapwallet?: TapWallet;
  }
}
