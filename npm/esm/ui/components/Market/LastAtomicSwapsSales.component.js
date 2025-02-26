import React from "react";
import { memo, useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ChartNoAxesCombined } from "lucide-react";
import bitcoinsdk from "../../../core/index.js";
import { Loader } from "../Loader/Loader.component.js";
import { Media } from "../Asset/Media.component.js";
import { Carousel } from "../Carousel/Carousel.component.js";
const assetCache = new Map();
function LastAtomicSwapsSalesComponent({ lastSales, isLoading }) {
    const [assets, setAssets] = useState([]);
    const [loadingAssets, setLoadingAssets] = useState(new Set());
    const [btcPrice, setBtcPrice] = useState(0);
    const observer = useRef(null);
    const navigate = useNavigate();
    useEffect(() => {
        bitcoinsdk.openbook.getBTCPrice().then((price) => setBtcPrice(price ?? 0));
    }, []);
    useEffect(() => {
        setAssets(lastSales.flatMap((lastSale) => lastSale.utxo_balance.map((utxo) => ({
            assetId: utxo.assetId,
            asset: assetCache.get(utxo.assetId) || undefined,
            qty: utxo.qty,
            unit_price: lastSale.unit_price,
            total_price: lastSale.total_price,
            seller: lastSale.seller,
            buyer: lastSale.buyer,
            txid: lastSale.txid,
            timestamp: lastSale.timestamp,
            block_hash: lastSale.block_hash,
            block_index: lastSale.block_index,
        }))));
    }, [lastSales]);
    const loadAsset = useCallback(async (index, assetId) => {
        if (loadingAssets.has(index) || assetCache.has(assetId)) {
            setAssets((prev) => prev.map((item) => item.asset || item.assetId !== assetId ? item : { ...item, asset: assetCache.get(assetId) }));
            return;
        }
        setLoadingAssets((prev) => new Set(prev).add(index));
        try {
            const asset = await bitcoinsdk.counterparty.getAsset({ asset: assetId });
            assetCache.set(assetId, asset);
            setAssets((prev) => prev.map((item) => item.asset || item.assetId !== assetId ? item : { ...item, asset }));
        }
        catch (error) {
            console.error("Error fetching asset:", error);
        }
        finally {
            setLoadingAssets((prev) => {
                const newSet = new Set(prev);
                newSet.delete(index);
                return newSet;
            });
        }
    }, [loadingAssets]);
    useEffect(() => {
        observer.current = new IntersectionObserver((entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    const index = Number(entry.target.getAttribute("data-index"));
                    const assetIds = assets.map((asset) => asset.assetId);
                    for (let i = index; i < index + 3 && i < assetIds.length; i++) {
                        if (assetIds[i]) {
                            loadAsset(i, assetIds[i]);
                        }
                    }
                }
            }
        }, { threshold: 0.5 });
        const elements = document.querySelectorAll(".asset-card");
        for (const el of elements) {
            observer.current?.observe(el);
        }
        return () => observer.current?.disconnect();
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
    return (React.createElement("div", { className: "relative" },
        React.createElement("h2", { className: "text-xl font-bold text-left text-primary flex flex-row items-center" },
            React.createElement(ChartNoAxesCombined, { size: 24, className: "mr-2" }),
            React.createElement("span", { className: "text-primary" }, "Last Atomic Swaps Sales")),
        React.createElement(Carousel, { items: assets, itemKey: (item) => `${item.assetId}-${item.txid}`, renderItem: (asset) => (React.createElement("button", { type: "button", onClick: () => handleURLClick(asset.assetId), className: "w-[240px] h-[240px] snap-center cursor-pointer" },
                React.createElement("div", { className: "relative w-full h-full overflow-hidden rounded-lg bg-primary group" }, asset.asset ? (React.createElement(React.Fragment, null,
                    React.createElement("div", { className: "absolute inset-0 flex items-center justify-center" },
                        React.createElement(Media, { asset: asset.asset, className: "w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 border-primary rounded-lg" })),
                    React.createElement("div", { className: "absolute text-left inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity border-none duration-300 flex items-end rounded-lg" },
                        React.createElement("div", { className: "text-white text-sm truncate w-full bg-light p-2 rounded-b-lg border border-primary" },
                            React.createElement("div", { className: "flex flex-row items-center justify-between" },
                                React.createElement("p", { className: "font-bold truncate" }, asset.asset.asset),
                                React.createElement("p", { className: "text-xs opacity-75 truncate" }, new Date(asset.timestamp).toLocaleDateString())),
                            React.createElement("p", { className: "text-xs opacity-75 truncate font-mono" },
                                React.createElement("span", { className: "text-primary" }, asset.qty),
                                " sold for",
                                " ",
                                React.createElement("span", { className: "text-primary" },
                                    Number(asset.total_price).toLocaleString(),
                                    " sats ($",
                                    Number((asset.total_price * 10 ** -8 * btcPrice).toFixed(2)).toLocaleString(),
                                    ")")))))) : (React.createElement("div", { className: "w-full h-full flex items-center justify-center text-white" },
                    React.createElement(Loader, null)))))) })));
}
export const LastAtomicSwapsSales = memo(LastAtomicSwapsSalesComponent);
