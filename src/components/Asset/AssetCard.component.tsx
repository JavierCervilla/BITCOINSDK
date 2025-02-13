import { Media } from "@/components/Asset/Media.component.tsx";
import type { XCPAssetBalance } from "@/types/openbook.d.ts";
import { useNavigate } from "react-router-dom";

export function Asset({ asset }: { asset: XCPAssetBalance }) {
  const navigate = useNavigate();

  function handleURLClick() {
    navigate(`/asset/${asset.asset}`);
  }

  return (
    <button
      type="button"
      onClick={handleURLClick}
      className="block aspect-[4/5] group hover:scale-[1.02] transition-all duration-300 cursor-pointer rounded-lg"
    >
      <div className="h-full bg-gradient-to-br from-primary via-secondary to-primary shadow-lg overflow-hidden transition-all duration-300 group-hover:scale-[1.02]  rounded-lg">
        <div className="h-full flex flex-col p-3">
          <div className="flex-1 flex items-center justify-center bg-light  rounded-lg overflow-hidden backdrop-blur-sm">
            <Media asset={asset} className="w-full h-full bg-transparent border-none rounded-lg transition-transform duration-300 group-hover:scale-110" />
          </div>
          <div className="mt-2 bg-light text-dark opacity-60 backdrop-blur-sm rounded-md p-2">
            <h3 className="text-center opacity-100 text-sm font-bold truncate">
              {asset.name.toUpperCase()}
            </h3>
            <p className="text-center mt-1">
              {Number(asset.qty_normalized).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </button>
  );
}
