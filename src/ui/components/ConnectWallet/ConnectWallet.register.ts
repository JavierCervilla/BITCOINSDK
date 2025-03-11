import { ConnectWalletButton } from "./ConnectWallet.ts";

if (!customElements.get("connect-wallet-button")) {
    customElements.define("connect-wallet-button", ConnectWalletButton);
}

export { ConnectWalletButton };
