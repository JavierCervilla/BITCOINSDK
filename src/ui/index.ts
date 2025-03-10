import { WalletManager, useWallet } from './context/walletContext.ts';
import { default as ConnectWalletButtonReact } from './components/ConnectWallet/ConnectWallet.react.tsx';
import { ConnectWalletButton } from "./components/ConnectWallet/ConnectWallet.ts";
import { walletConfig, UNIVERSE_WALLET_LABEL } from './providers/index.ts';

export { WalletManager, useWallet, ConnectWalletButtonReact, ConnectWalletButton, walletConfig, UNIVERSE_WALLET_LABEL };
