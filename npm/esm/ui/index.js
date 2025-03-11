import { WalletManager } from './context/walletContext.js';
import { useWallet } from './context/walletInstance.js';
import { default as ConnectWalletButtonReact } from './components/ConnectWallet/ConnectWallet.react.js';
import { ConnectWalletButton } from "./components/ConnectWallet/ConnectWallet.js";
import { walletConfig, UNIVERSE_WALLET_LABEL } from './providers/index.js';
export { WalletManager, useWallet, ConnectWalletButtonReact, ConnectWalletButton, walletConfig, UNIVERSE_WALLET_LABEL };
