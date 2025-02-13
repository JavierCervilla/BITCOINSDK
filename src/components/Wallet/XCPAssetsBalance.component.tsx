import type { XCPAssetBalance } from "@/types/openbook.d.ts";
import { Asset } from "@/components/Asset/AssetCard.component.tsx";


export function XCPAssetsBalance({ assets }: { assets: XCPAssetBalance[] }) {
  if (!assets?.length) return null;

  return (
    <div className="grid gap-3 p-2 sm:grid-cols-2 lg:grid-cols-4 w-full z-0">
      {assets.map((asset, index) => (
        <Asset asset={asset} key={`${asset.asset}-${index}`} />
      ))}
    </div>
  );
}
