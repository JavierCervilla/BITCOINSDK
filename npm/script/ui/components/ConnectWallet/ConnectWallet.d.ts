import { type WalletManagerInterface } from "../../context/walletContext.js";
declare class ConnectWalletButton extends globalThis.HTMLElement {
    private readonly wallets;
    walletManager: WalletManagerInterface;
    constructor();
    connectedCallback(): void;
    private render;
}
export { ConnectWalletButton };
