import { WalletManager, useWallet } from './context/walletContext.ts';
import { ConnectWalletButton } from "./components/ConnectWallet/ConnectWallet.ts";
import { walletConfig, UNIVERSE_WALLET_LABEL } from './providers/index.ts';

if (!customElements.get("connect-wallet-button")) {
    customElements.define("connect-wallet-button", ConnectWalletButton);
}

export { WalletManager, useWallet, ConnectWalletButton, walletConfig, UNIVERSE_WALLET_LABEL };
