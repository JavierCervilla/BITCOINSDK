import React from "react";
import { Asset } from "../Asset/AssetCard.component.js";
export function XCPAssetsBalance({ assets }) {
    if (!assets?.length)
        return null;
    return (React.createElement("div", { className: "grid gap-3 p-2 sm:grid-cols-2 lg:grid-cols-4 w-full z-0" }, assets.map((asset, index) => (React.createElement(Asset, { asset: asset, key: `${asset.asset}-${index}` })))));
}
