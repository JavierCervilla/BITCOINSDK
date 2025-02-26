import React from "react";
import { useState, useCallback, memo } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { cn } from "../../../utils/style.js";
import { DispensersList } from "./Dispensers/DispenserList.component.js";
import { AtomicSwapList } from "./AtomicSwaps/AtomicSwapList.component.js";
import { Loader } from "../../Loader/Loader.component.js";
const tabs = [
    { value: "swaps", label: "Atomic Swaps" },
    { value: "dispensers", label: "Dispensers" },
];
function MarketInfoComponent({ asset, btcPrice, swaps, dispensers, isLoading, mcap, volume }) {
    const [activeTab, setActiveTab] = useState("swaps");
    const handleTabChange = useCallback((value) => {
        setActiveTab(value);
    }, []);
    if (isLoading) {
        return React.createElement(Loader, null);
    }
    return (React.createElement("div", { className: "bg-light p-4 rounded-lg shadow-md text-dark w-full border border-secondary sm:min-h-[calc(100vh-358px)] md:min-h-[358px]" },
        React.createElement("h2", { className: "font-bold text-lg" },
            React.createElement("span", { className: "text-primary" }, asset),
            " Markets"),
        React.createElement("div", { className: "flex flex-row gap-4" },
            React.createElement("p", { className: "text-sm text-secondary" },
                "BTC Volume: ",
                React.createElement("span", { className: "text-primary" },
                    volume.toLocaleString(),
                    " BTC ",
                    React.createElement("span", { className: "text-xs text-secondary" },
                        "(",
                        Number(volume * btcPrice).toLocaleString(),
                        " $)"))),
            React.createElement("p", { className: "text-sm text-secondary" },
                "MarketCap: ",
                React.createElement("span", { className: "text-primary" },
                    mcap.toLocaleString(),
                    " BTC ",
                    React.createElement("span", { className: "text-secondary text-xs" },
                        "(",
                        Number(mcap * btcPrice).toLocaleString(),
                        " $)")))),
        React.createElement(Tabs.Root, { value: activeTab, onValueChange: handleTabChange },
            React.createElement(Tabs.List, { className: "flex border-b border-secondary space-x-4" }, tabs.map((tab) => (React.createElement(Tabs.Trigger, { key: tab.value, value: tab.value, className: cn("p-2 text-secondary transition-all border-b-2 border-transparent cursor-pointer hover:text-primary", activeTab === tab.value ? "text-primary border-primary" : "text-secondary") }, tab.label)))),
            React.createElement(Tabs.Content, { value: "swaps", className: "mt-4 bg-light p-2 rounded-md text-dark text-sm" },
                React.createElement(AtomicSwapList, { btcPrice: btcPrice, swaps: swaps, isLoading: isLoading })),
            React.createElement(Tabs.Content, { value: "dispensers", className: "mt-4 bg-light p-2 rounded-md text-dark text-sm" },
                React.createElement(DispensersList, { btcPrice: btcPrice, dispensers: dispensers, isLoading: isLoading })))));
}
export const MarketInfo = memo(MarketInfoComponent);
