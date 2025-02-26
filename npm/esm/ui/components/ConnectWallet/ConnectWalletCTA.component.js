import React from "react";
import { walletConfig } from "../../index.js";
import ConnectWalletButton from "./ConnectWallet.component.js";
export function ConnectWalletCTA() {
    return (React.createElement("section", { className: "mt-8 p-6 flex flex-col items-center justify-center gap-6 border border-primary rounded-xl text-center w-full max-w-lg mx-auto transition-all duration-300 ease-in-out" },
        React.createElement("div", { className: "space-y-2" },
            React.createElement("h3", { className: "text-2xl font-bold text-primary" }, "Connect Your Wallet"),
            React.createElement("p", { className: "text-muted-foreground" }, "Start trading in seconds")),
        React.createElement(ConnectWalletButton, { className: "cursor-pointer w-full py-4 px-8 text-base md:text-2xl tracking-wider bg-light text-primary border border-primary rounded-lg font-semibold flex items-center justify-center gap-2 duration-300 ease-in-out transition-all hover:bg-primary hover:text-light hover:scale-105", wallets: walletConfig })));
}
