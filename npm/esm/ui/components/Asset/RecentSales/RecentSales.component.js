import React from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { useState, memo, useCallback } from "react";
import { cn } from "../../../utils/style.js";
import { DispensesList } from "./Dispense/DispenseList.component.js";
import { RecentSalesAtomicSwapList } from "./AtomicSwaps/AtomicSwapList.component.js";
import { Loader } from "../../Loader/Loader.component.js";
const tabs = [
    { value: "swaps", label: "Atomic Swaps" },
    { value: "dispenses", label: "Dispenses" },
];
function RecentSalesComponent({ asset, btcPrice, swaps, dispenses, isLoading }) {
    const [activeTab, setActiveTab] = useState("swaps");
    const handleTabChange = useCallback((value) => {
        setActiveTab(value);
    }, []);
    if (isLoading) {
        return React.createElement(Loader, null);
    }
    return (React.createElement("div", { className: "bg-light p-4 rounded-lg shadow-md text-dark w-full border border-secondarysm:min-h-[calc(100vh-358px)] md:min-h-[358px]" },
        React.createElement("h2", { className: "font-bold text-lg" },
            React.createElement("span", { className: "text-primary" }, asset),
            " Recent Sales"),
        React.createElement(Tabs.Root, { value: activeTab, onValueChange: handleTabChange },
            React.createElement(Tabs.List, { className: "flex border-b border-secondary space-x-4" }, tabs.map((tab) => (React.createElement(Tabs.Trigger, { key: tab.value, value: tab.value, className: cn("p-2 text-secondary transition-all border-b-2 border-transparent cursor-pointer hover:text-primary", activeTab === tab.value ? "text-primary border-primary" : "text-secondary") }, tab.label)))),
            React.createElement(Tabs.Content, { value: "swaps", className: "mt-4 bg-light p-2 rounded-md text-dark text-sm" },
                React.createElement(RecentSalesAtomicSwapList, { asset: asset, btcPrice: btcPrice, swaps: swaps, isLoading: isLoading })),
            React.createElement(Tabs.Content, { value: "dispenses", className: "mt-4 bg-light p-2 rounded-md text-dark text-sm" },
                React.createElement(DispensesList, { btcPrice: btcPrice, dispenses: dispenses, isLoading: isLoading })))));
}
export const RecentSales = memo(RecentSalesComponent);
