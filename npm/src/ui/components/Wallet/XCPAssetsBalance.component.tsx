import React from "react";
import { Asset } from "../Asset/AssetCard.component.js";

import type * as OpenbookAPI from "../../../core/openbook/api";

export function XCPAssetsBalance({ assets }: Readonly<{ assets: OpenbookAPI.XCPAssetBalance[] }>) {
  if (!assets?.length) return null;

  return (
    <div className="grid gap-3 p-2 sm:grid-cols-2 lg:grid-cols-4 w-full z-0">
      {assets.map((asset, index) => (
        <Asset asset={asset} key={`${asset.asset}-${index}`} />
      ))}
    </div>
  );
}
