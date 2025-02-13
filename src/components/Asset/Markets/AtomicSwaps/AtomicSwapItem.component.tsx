import type { OpenbookAtomicSwapOrder, UtxoBalance } from "@/lib/openbook/api.d.ts"
import type { BTCPrice } from "@/lib/bitcoin/api.d.ts";
import { useWallet } from "@/index.ts";
import { short_address } from "@/lib/utils/index.ts";

interface AtomicSwapItemProps {
  atomicSwap: OpenbookAtomicSwapOrder
  btcPrice: BTCPrice
}



export function AtomicSwapItem({ atomicSwap, btcPrice }: AtomicSwapItemProps) {
  const { walletAddress } = useWallet()
  return (
    <div className="flex flex-col md:flex-row gap-2 p-4 justify-between transition-colors border rounded-lg md:border-b border-primary">

      <div className="flex flex-col md:flex-row md:w-1/5 gap-1 m-auto">
        <span className="text-xs font-medium md:hidden">Quantity:</span>
        {atomicSwap.utxo_balance.map((balance: UtxoBalance) => (
          <span key={balance.assetId} className="text-sm font-mono truncate" title={balance.qty.toString()}>
            {Number(balance.qty).toLocaleString()}
          </span>
        ))}
      </div>

      <div className="flex flex-col md:w-1/5 gap-1 m-auto">
        <span className="text-xs font-medium md:hidden">Price:</span>
        <span className="text-sm font-mono truncate" title={atomicSwap.price.toString()}>
          {atomicSwap.price.toLocaleString()} sats
        </span>
        <span className="text-xs font-mono truncate" title={atomicSwap.price.toString()}>
          {(atomicSwap.price * 10 ** -8 * btcPrice.USD).toLocaleString()} $
        </span>
      </div>

      <div className="flex flex-col md:w-1/5 gap-1 m-auto">
        <span className="text-xs font-medium md:hidden">Seller:</span>
        <span className="text-sm font-mono truncate" title={new Date(atomicSwap.timestamp).toLocaleString()}>
          {short_address(atomicSwap.seller)}
        </span>
      </div>

      <div className="flex flex-col md:w-1/5 gap-1 m-auto">
        <span className="text-xs font-medium md:hidden">Date:</span>
        <span className="text-sm font-mono truncate" title={new Date(atomicSwap.timestamp).toLocaleString()}>
          {new Date(Number(atomicSwap.timestamp) * 1000).toLocaleDateString()}
        </span>
      </div>

      <div className="flex flex-col md:w-1/5 gap-1 m-auto">
        <span className="text-xs font-medium md:hidden">Action:</span>
        <button className="cursor-pointer text-sm text-primary rounded-lg p-2 bg-light border border-primary hover:bg-primary hover:text-light transition-colors font-mono truncate" type="button">
          {atomicSwap.seller === walletAddress ? "Cancel" : "Buy"}
        </button>
      </div>
    </div>
  )
}

