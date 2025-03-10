import React from "react";
import { walletConfig } from "../../index.js";
import ConnectWalletButton from "./ConnectWallet.component.js";
export function ConnectWalletAction() {
    return (React.createElement(ConnectWalletButton, { buttonClassName: "text-primary cursor-pointer flex text-xs font-medium items-center gap-2 border border-primary rounded-lg px-2 py-0.5", dropdownClassName: "border border-primary bg-light text-black border border-primary", dropdownItemClassName: "text-black", wallets: walletConfig }));
}
