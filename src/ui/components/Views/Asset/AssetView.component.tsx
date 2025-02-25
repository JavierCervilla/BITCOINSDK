import { useState, useEffect, useCallback } from "react"
import { BookImage } from "lucide-react"
import { useParams } from "react-router-dom";

import { bitcoinsdk } from "@/core/index.ts";

import { Loader } from "@/ui/components/Loader/Loader.component.tsx";
import { Media } from "@/ui/components/Asset/Media.component.tsx";
import { AssetInfo } from "@/ui/components/Asset/AssetInfo.component.tsx";
import { BalanceSection } from "@/ui/components/Asset/Balance/BalanceSection.component.tsx";
import { MarketSection } from "@/ui/components/Asset/MarketSection.tsx";

import type { BTCPrice } from "@/core/bitcoin/api.d.ts";

export function AssetView() {
  const { assetid } = useParams();
  const [isLoading, setIsLoading] = useState(false)
  const [asset, setAsset] = useState<| null>(null);
  const [btcPrice, setBtcPrice] = useState<BTCPrice | null>(null);


  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const [btcPrice, asset] = await Promise.all([
      bitcoinsdk.openbook.getBTCPrice(),
      bitcoinsdk.counterparty.getAsset({ asset: assetid as string })
    ]);
    console.log({btcPrice})
    setAsset(asset);
    setBtcPrice(btcPrice);
    setIsLoading(false);
  }, [assetid]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="flex flex-col gap-6 p-4">
      <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
        <BookImage className="w-6 h-6" />
        {assetid}
      </h1>
      <div className="flex flex-col lg:flex-row gap-4 max-h-[480px]">
        <div className="flex flex-col gap-4  min-w-1/3 lg:max-w-[400px] max-w-none">
          <div className="flex flex-col gap-2 p-1 border border-secondary rounded-lg ">
            <Media
              className="w-full h-auto bg-transparent border-none rounded-lg transition-transform duration-300 group-hover:scale-110 max-h-[390px]"
              asset={{ asset: asset?.asset, name: asset?.asset_longname, description: asset?.description }} />
            <AssetInfo asset={asset} />
          </div>
          <div className="flex flex-col gap-4 p-1 border border-secondary rounded-lg">
            <BalanceSection asset={assetid as string} btcPrice={btcPrice || 0} />
          </div>
        </div>
        <MarketSection asset={assetid as string} supply={Number(asset?.supply_normalized) || 0} btcPrice={btcPrice || 0} />
      </div>
    </div>
  )
} 