import { useState, useEffect } from "react"
import { BookImage } from "lucide-react"
import { Loader } from "@/components/Loader/Loader.component.tsx";
import { bitcoinsdk } from "@/lib/index.ts";
import { useParams } from "react-router-dom";
import { Media } from "@/components/Asset/Media.component.tsx";
import { MarketInfo } from "@/components/Asset/Markets/MarketInfo.component.tsx";
import { RecentSales } from "../../Asset/RecentSales/RecentSales.component.tsx";
import { AssetInfo } from "@/components/Asset/AssetInfo.component.tsx";
import { BalanceSection } from "@/components/Asset/Balance/BalanceSection.component.tsx";
import { MarketSection } from "@/components/Asset/MarketSection.tsx";
export function AssetView() {
  const { assetid } = useParams();
  const [isLoading, setIsLoading] = useState(false)
  const [asset, setAsset] = useState<| null>(null);
  useEffect(() => {
    setIsLoading(true);
    bitcoinsdk.counterparty.getAsset({ asset: assetid as string }).then((asset) => {
      setAsset(asset);
      setIsLoading(false);
    }).catch((error) => {
      console.error(error);
      setIsLoading(false);
    });

    return () => {
      setIsLoading(false);
    };
  }, [assetid]);


  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="flex flex-col gap-6 p-4">
      <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
        <BookImage className="w-6 h-6" />
        {assetid}
      </h1>
      <div className="flex flex-col lg:flex-row gap-4 max-h-[500px]">
        <div className="flex flex-col gap-4  min-w-1/3 lg:max-w-[400px] max-w-none">
          <div className="flex flex-col gap-2 p-1 border border-secondary rounded-lg">
            <Media
              className="w-full h-auto bg-transparent border-none rounded-lg transition-transform duration-300 group-hover:scale-110"
              asset={{ asset: asset?.asset, name: asset?.asset_longname, description: asset?.description }} />
            <AssetInfo asset={asset} />
          </div>
          <div className="flex flex-col gap-4 p-1 border border-secondary rounded-lg">
            <BalanceSection asset={assetid as string} />
          </div>
        </div>
        <MarketSection asset={assetid as string} supply={Number(asset?.supply_normalized) ?? 0} />
      </div>
    </div>
  )
} 