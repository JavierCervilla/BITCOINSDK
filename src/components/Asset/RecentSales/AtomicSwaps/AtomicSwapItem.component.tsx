import type { OpenbookAtomicSwap } from "@/lib/openbook/api.d.ts"
import type { BTCPrice } from "@/lib/bitcoin/api.d.ts";
import { short_address } from "@/lib/utils/index.ts";

interface AtomicSwapItemProps {
  atomicSwap: OpenbookAtomicSwap
  btcPrice: BTCPrice
  asset: string
}

export function AtomicSwapItem({ atomicSwap, btcPrice, asset }: AtomicSwapItemProps) {
  return (
    <div className="flex flex-col md:flex-row gap-2 p-4 justify-between transition-colors border rounded-lg md:border-b border-primary">
      <div className="flex flex-col md:flex-row md:w-1/5 gap-1 m-auto">
        <span className="text-xs font-medium md:hidden">Quantity:</span>
        {atomicSwap.utxo_balance.filter((balance) => balance.assetId === asset).map((balance) => (
          <span key={balance.assetId} className="text-sm font-mono truncate" title={balance.qty.toString()}>
            {Number(balance.qty).toLocaleString()}
          </span>
        ))}
      </div>

      <div className="flex flex-col md:w-1/5 gap-1 m-auto">
        <span className="text-xs font-medium md:hidden">Unit Price:</span>
        <span className="text-sm font-mono truncate" title={atomicSwap.unit_price.toString()}>
          {atomicSwap.unit_price.toLocaleString()} sats
        </span>
        <span className="text-xs font-mono truncate" title={atomicSwap.unit_price.toLocaleString()}>
          {(atomicSwap.unit_price * 10 ** -8 * btcPrice.USD).toLocaleString()} $
        </span>
      </div>

      <div className="flex flex-col md:w-1/5 gap-1 m-auto">
        <span className="text-xs font-medium md:hidden">Price:</span>
        <span className="text-sm font-mono truncate" title={atomicSwap.total_price.toString()}>
          {atomicSwap.total_price.toLocaleString()} sats
        </span>
        <span className="text-xs font-mono truncate" title={atomicSwap.total_price.toString()}>
          {(atomicSwap.total_price * 10 ** -8 * btcPrice.USD).toLocaleString()} $
        </span>
      </div>

      <div className="flex flex-col md:w-1/5 gap-1 m-auto">
        <span className="text-xs font-medium md:hidden">Date:</span>
        <span className="text-sm font-mono truncate" title={new Date(atomicSwap.timestamp).toLocaleString()}>
          {new Date(atomicSwap.timestamp).toLocaleDateString()}
        </span>
      </div>
      <div className="flex flex-col md:w-1/5 gap-1 m-auto">
        <span className="text-xs font-medium md:hidden">Date:</span>
        <a href={`https://horizon.market/explorer/tx/${atomicSwap.txid}`} target="_blank" rel="noopener noreferrer" className="text-xs font-mono truncate text-primary" title={short_address(atomicSwap.txid)}>
          {short_address(atomicSwap.txid)}
        </a>
      </div>
    </div>
  )
}

