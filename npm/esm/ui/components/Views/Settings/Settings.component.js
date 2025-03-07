import React from "react";
import { Settings as SettingsIcon, Palette } from "lucide-react";
import { useWallet } from "../../../context/walletContext.js";
import { ThemeSelector } from "../../ThemeSelector/ThemeSelector.component.js";
export function SettingsView() {
    const { connected } = useWallet();
    return (React.createElement("div", { className: "flex flex-col gap-6 p-4" },
        React.createElement("div", { className: "flex items-center gap-2 text-primary" },
            React.createElement(SettingsIcon, { className: "w-6 h-6" }),
            React.createElement("h1", { className: "text-2xl font-bold" }, "Settings")),
        React.createElement("div", { className: "space-y-6" },
            React.createElement("section", null,
                React.createElement("div", { className: "flex items-center gap-2 text-primary mb-6" },
                    React.createElement(Palette, { className: "w-5 h-5" }),
                    React.createElement("h2", { className: "text-xl font-semibold" }, "Theme Settings")),
                React.createElement(ThemeSelector, { variant: "full" })),
            !connected && (React.createElement("div", { className: "p-4 bg-primary/5 border border-primary/20 rounded-lg" },
                React.createElement("p", { className: "text-secondary text-center" }, "Connect your wallet to access additional settings"))))));
}
