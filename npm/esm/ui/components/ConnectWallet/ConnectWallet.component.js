import React from "react";
import { Wallet, LogOut } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useWallet } from "../../context/walletContext.js";
function shortenAddress(address) {
    return `${address.slice(0, 6)}...${address.slice(-6)}`;
}
export function ConnectWalletButton({ className, wallets, }) {
    const { walletAddress, connected, connectWallet, disconnectWallet } = useWallet();
    return (React.createElement("div", null, !connected ? (React.createElement(DropdownMenu.Root, null,
        React.createElement(DropdownMenu.Trigger, { asChild: true },
            React.createElement("button", { type: "button", className: className },
                React.createElement(Wallet, { className: "w-5 h-5" }),
                React.createElement("span", null, "Connect Wallet"))),
        React.createElement(DropdownMenu.Portal, null,
            React.createElement(DropdownMenu.Content, { className: "z-50 min-w-[12rem] overflow-hidden rounded-xl border border-primary bg-light p-1 shadow-md", sideOffset: 5 }, Object.entries(wallets).map(([key, { label, icon }], index) => (React.createElement(DropdownMenu.Item, { key: key, onClick: async () => await connectWallet(key), className: `flex items-center px-4 py-3 text-sm font-medium cursor-pointer hover:bg-primary hover:border-none hover:text-light text-primary transition-all duration-300 ease-in-out transform hover:scale-105 ${index < Object.entries(wallets).length - 1 ? "border-b border-primary" : ""}` },
                React.createElement("img", { src: icon || "/placeholder.svg", alt: label, className: "w-6 h-6 mr-3" }),
                React.createElement("span", null, label)))))))) : (React.createElement("div", { className: "flex items-center gap-3 z-10" },
        React.createElement("div", { className: "px-6 py-3 text-sm font-medium border rounded-lg bg-light text-dark border-primary" }, shortenAddress(walletAddress)),
        React.createElement("button", { type: "button", onClick: disconnectWallet, className: "flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl shadow-md bg-primary text-light cursor-pointer hover:bg-hover transition-all duration-300 ease-in-out transform hover:scale-105" },
            React.createElement(LogOut, { className: "w-5 h-5" }))))));
}
export default ConnectWalletButton;
