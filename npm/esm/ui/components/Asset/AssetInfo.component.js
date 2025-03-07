import React from "react";
import { useState, useEffect } from "react";
import { Lock, Unlock } from "lucide-react";
import { bitcoinsdk } from "../../../core/index.js";
export function AssetInfo({ asset }) {
    const [holders, setHolders] = useState(0);
    useEffect(() => {
        bitcoinsdk.counterparty.getHoldersCount({ asset: asset?.asset }).then((data) => {
            setHolders(data);
        });
    }, [asset]);
    return (React.createElement("div", { className: "flex flex-col" },
        React.createElement("div", { id: "description", className: "border-primary border-b p-2" },
            React.createElement("div", { className: "text-primary flex items-center gap-2 font-bold text-md" },
                React.createElement("h4", null, "Description"),
                asset?.description_locked || asset?.locked ?
                    React.createElement(Lock, { className: "w-4 h-4" })
                    :
                        React.createElement(Unlock, { className: "w-4 h-4" })),
            React.createElement("p", { className: "text-sm text-secondary truncate" }, asset?.description)),
        React.createElement("div", { id: "general-info", className: "flex gap-2 justify-between p-2" },
            React.createElement("div", { id: "supply", className: "text-primary flex flex-col font-bold text-md " },
                React.createElement("h4", { className: "text-secondary" }, "Supply"),
                React.createElement("p", { className: "text-xs text-primary truncate" }, Number(asset?.supply_normalized).toLocaleString())),
            React.createElement("div", { id: "supply", className: "flex items-center justify-between rounded-lg p-2 shadow-sm" },
                React.createElement("div", { className: "flex items-center space-x-2" },
                    React.createElement("span", { className: "text-primary font-bold text-sm" }, asset?.locked ? "Locked" : "Unlocked"),
                    asset?.locked ? React.createElement(Lock, { className: "w-4 h-4 text-primary" }) : React.createElement(Unlock, { className: "w-4 h-4 text-primary" }))),
            React.createElement("div", { id: "holders", className: "text-primary flex flex-col font-bold text-md " },
                React.createElement("h4", { className: "text-secondary" }, "Holders"),
                React.createElement("p", { className: "text-xs text-primary truncate" }, holders)))));
}
