import React from "react";
import { memo, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import bitcoinsdk from "../../../core/index.js";
import { Media } from "../Asset/Media.component.js";
import { Loader } from "../Loader/Loader.component.js";
const assetCache = new Map();
function LastAtomicSwapsOrdersComponent({ lastOrders, isLoading }) {
    const [assets, setAssets] = useState([]);
    const [btcPrice, setBtcPrice] = useState(0);
    const navigate = useNavigate();
    const getBtcPrice = useCallback(async () => {
        const [price] = await Promise.all([bitcoinsdk.openbook.getBTCPrice()]);
        setBtcPrice(price);
    }, []);
    useEffect(() => {
        getBtcPrice();
    }, [getBtcPrice]);
    useEffect(() => {
        setAssets(lastOrders.filter((lastOrder) => lastOrder.status === "active").flatMap((lastOrder) => lastOrder.utxo_balance.map((utxo) => ({
            assetId: utxo.assetId,
            asset: assetCache.get(utxo.assetId) || undefined,
            qty: utxo.qty,
            unit_price: lastOrder.price / utxo.qty,
            total_price: lastOrder.price,
            seller: lastOrder.seller,
            txid: lastOrder.txid,
            timestamp: lastOrder.timestamp,
            psbt: lastOrder.psbt,
            block_index: lastOrder.block_index,
            status: lastOrder.status,
        }))));
    }, [lastOrders]);
    const loadAsset = useCallback(async (assetId) => {
        if (assetCache.has(assetId)) {
            setAssets((prev) => prev.map((item) => item.asset || item.assetId !== assetId ? item : { ...item, asset: assetCache.get(assetId) }));
            return;
        }
        try {
            const asset = await bitcoinsdk.counterparty.getAsset({ asset: assetId });
            assetCache.set(assetId, asset);
            setAssets((prev) => prev.map((item) => (item.asset || item.assetId !== assetId ? item : { ...item, asset })));
        }
        catch (error) {
            console.error("Error fetching asset:", error);
        }
    }, []);
    useEffect(() => {
        for (const asset of assets) {
            if (!asset.asset) {
                loadAsset(asset.assetId);
            }
        }
    }, [assets, loadAsset]);
    function handleURLClick(assetId) {
        navigate(`/asset/${assetId}`);
    }
    if (isLoading) {
        return React.createElement(Loader, null);
    }
    if (assets.length === 0) {
        return null;
    }
    return (React.createElement("div", { className: "container mx-auto px-4 py-8" },
        React.createElement("h2", { className: "text-2xl font-bold mb-6 text-primary flex items-center" },
            React.createElement(ShoppingCart, { size: 24, className: "mr-2" }),
            React.createElement("span", null, "Atomic Swaps Open Orders")),
        React.createElement("div", { className: "overflow-x-auto" },
            React.createElement("table", { className: "w-full border-collapse" },
                React.createElement("thead", null,
                    React.createElement("tr", { className: "text-left border-b border-border" },
                        React.createElement("th", { className: "py-3 px-4 text-sm font-medium text-muted-foreground" }, "Asset"),
                        React.createElement("th", { className: "py-3 px-4 text-sm font-medium text-muted-foreground" }, "Qty"),
                        React.createElement("th", { className: "py-3 px-4 text-sm font-medium text-muted-foreground" }, "Unit Price"),
                        React.createElement("th", { className: "py-3 px-4 text-sm font-medium text-muted-foreground" }, "Price"),
                        React.createElement("th", { className: "py-3 px-4 text-sm font-medium text-muted-foreground" }, "Created"),
                        React.createElement("th", { className: "py-3 px-4 text-sm font-medium text-muted-foreground" }))),
                React.createElement("tbody", null, assets.map((asset) => (
                // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
                React.createElement("tr", { key: `${asset.assetId}-${asset.txid}`, onClick: () => handleURLClick(asset.assetId), className: "border-b cursor-pointer border-border hover:bg-muted/50 transition-colors" },
                    React.createElement("td", { className: "py-3 px-4" },
                        React.createElement("div", { className: "flex items-center space-x-3" },
                            React.createElement("div", { className: "w-12 h-12 flex-shrink-0" }, asset.asset ? (React.createElement(Media, { asset: asset.asset, showStampIcon: false, className: "w-full h-full object-cover rounded border-primary" })) : (React.createElement("div", { className: "w-full h-full flex items-center justify-center bg-muted rounded" },
                                React.createElement(Loader, null)))),
                            React.createElement("span", { className: "font-medium" }, asset.asset?.asset || asset.assetId))),
                    React.createElement("td", { className: "py-3 px-4" }, asset.qty),
                    React.createElement("td", { className: "py-3 px-4" },
                        React.createElement("div", { className: "text-sm" },
                            `${Number(asset.unit_price).toLocaleString()} sat`,
                            React.createElement("div", { className: "text-xs text-muted-foreground" },
                                "$",
                                Number((asset.unit_price * 10 ** -8 * btcPrice).toFixed(2))))),
                    React.createElement("td", { className: "py-3 px-4" },
                        React.createElement("div", { className: "text-sm" },
                            Number(asset.total_price).toLocaleString(),
                            " sat",
                            React.createElement("div", { className: "text-xs text-muted-foreground" },
                                "$",
                                Number((asset.total_price * 10 ** -8 * btcPrice).toFixed(2))))),
                    React.createElement("td", { className: "py-3 px-4 text-sm text-muted-foreground" }, new Date(Number(asset.timestamp) * 1000).toLocaleDateString()),
                    React.createElement("td", { className: "py-3 px-4" }, asset.status === "active" ? React.createElement("span", null, "view") : React.createElement("span", null, "expired"))))))))));
}
export const LastAtomicSwapsOrders = memo(LastAtomicSwapsOrdersComponent);
