import type { HTMLAttributes, ButtonHTMLAttributes, ImgHTMLAttributes } from 'react';
import type { LeatherProvider } from '@leather.io/rpc';
import type { InputToSign } from "../context/walletContext.tsx";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      div: HTMLAttributes<HTMLDivElement>;
      span: HTMLAttributes<HTMLSpanElement>;
      button: ButtonHTMLAttributes<HTMLButtonElement>;
      p: HTMLAttributes<HTMLParagraphElement>;
      img: ImgHTMLAttributes<HTMLImageElement>;
      ul: HTMLAttributes<HTMLUListElement>;
      li: HTMLAttributes<HTMLLIElement>;
      iframe: HTMLAttributes<HTMLIFrameElement>;
    }
  }
  
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

  interface GlobalThis {
    LeatherProvider?: LeatherProvider;
    unisat?: Unisat;
    okxwallet?: OkxWallet;
    tapwallet?: TapWallet;
  }
}
