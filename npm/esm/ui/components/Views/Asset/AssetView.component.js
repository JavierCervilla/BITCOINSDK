import React from "react";
import { useState, useEffect, useCallback } from "react";
import { BookImage } from "lucide-react";
import { useParams } from "react-router-dom";
import { bitcoinsdk } from "../../../../core/index.js";
import { Loader } from "../../Loader/Loader.component.js";
import { Media } from "../../Asset/Media.component.js";
import { AssetInfo } from "../../Asset/AssetInfo.component.js";
import { BalanceSection } from "../../Asset/Balance/BalanceSection.component.js";
import { MarketSection } from "../../Asset/MarketSection.js";
export function AssetView() {
    const { assetid } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [asset, setAsset] = useState(null);
    const [btcPrice, setBtcPrice] = useState(null);
    const fetchData = useCallback(async () => {
        setIsLoading(true);
        const [btcPrice, asset] = await Promise.all([
            bitcoinsdk.openbook.getBTCPrice(),
            bitcoinsdk.counterparty.getAsset({ asset: assetid })
        ]);
        console.log({ btcPrice });
        setAsset(asset);
        setBtcPrice(btcPrice);
        setIsLoading(false);
    }, [assetid]);
    useEffect(() => {
        fetchData();
    }, [fetchData]);
    if (isLoading) {
        return React.createElement(Loader, null);
    }
    return (React.createElement("div", { className: "flex flex-col gap-6 p-4" },
        React.createElement("h1", { className: "text-2xl font-bold text-primary flex items-center gap-2" },
            React.createElement(BookImage, { className: "w-6 h-6" }),
            assetid),
        React.createElement("div", { className: "flex flex-col lg:flex-row gap-4 max-h-[480px]" },
            React.createElement("div", { className: "flex flex-col gap-4  min-w-1/3 lg:max-w-[400px] max-w-none" },
                React.createElement("div", { className: "flex flex-col gap-2 p-1 border border-secondary rounded-lg " },
                    React.createElement(Media, { className: "w-full h-auto bg-transparent border-none rounded-lg transition-transform duration-300 group-hover:scale-110 max-h-[390px]", asset: { asset: asset?.asset, name: asset?.asset_longname, description: asset?.description } }),
                    React.createElement(AssetInfo, { asset: asset })),
                React.createElement("div", { className: "flex flex-col gap-4 p-1 border border-secondary rounded-lg" },
                    React.createElement(BalanceSection, { asset: assetid, btcPrice: btcPrice || 0 }))),
            React.createElement(MarketSection, { asset: assetid, supply: Number(asset?.supply_normalized) || 0, btcPrice: btcPrice || 0 }))));
}
