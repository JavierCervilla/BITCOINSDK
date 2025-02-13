import { memo } from "react"
import type { OpenbookAtomicSwap } from "@/lib/openbook/api.d.ts"
import type { BTCPrice } from "@/lib/bitcoin/api.d.ts"
import { short_address } from "@/lib/utils/index.ts"

interface AtomicSwapItemProps {
  atomicSwap: OpenbookAtomicSwap
  btcPrice: BTCPrice
  asset: string
}

function AtomicSwapItemComponent({ atomicSwap, btcPrice, asset }: Readonly<AtomicSwapItemProps>) {
  return (
    <div className="flex flex-col p-4 space-y-4 transition-colors border rounded-lg border-primary md:flex-row md:space-y-0 md:gap-2 md:justify-between">
      <div className="flex justify-between items-center md:flex-col md:w-1/5 md:items-start md:m-auto">
        <span className="text-sm font-medium text-secondary md:hidden">Quantity</span>
        <div className="text-right md:text-left">
          {atomicSwap.utxo_balance
            .filter((balance) => balance.assetId === asset)
            .map((balance) => (
              <span
                key={balance.assetId}
                className="text-base sm:text-xs font-mono font-semibold truncate"
                title={balance.qty.toString()}
              >
                {Number(balance.qty).toLocaleString()}
              </span>
            ))}
        </div>
      </div>

      <div className="flex justify-between items-center md:flex-col md:w-1/5 md:items-start md:m-auto">
        <span className="text-sm font-medium text-secondary md:hidden">Unit Price</span>
        <div className="text-right md:text-left">
          <span className="text-base sm:text-xs font-mono font-semibold truncate block" title={atomicSwap.unit_price.toString()}>
            {atomicSwap.unit_price.toLocaleString()} sats
          </span>
          <span
            className="text-xs font-mono text-secondary truncate block"
            title={atomicSwap.unit_price.toLocaleString()}
          >
            ${(atomicSwap.unit_price * 10 ** -8 * btcPrice.USD).toLocaleString()}
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center md:flex-col md:w-1/5 md:items-start md:m-auto">
        <span className="text-sm font-medium text-secondary md:hidden">Total Price</span>
        <div className="text-right md:text-left">
          <span className="text-base sm:text-xs font-mono font-semibold truncate block" title={atomicSwap.total_price.toString()}>
            {atomicSwap.total_price.toLocaleString()} sats
          </span>
          <span className="text-xs font-mono text-secondary truncate block" title={atomicSwap.total_price.toString()}>
            ${(atomicSwap.total_price * 10 ** -8 * btcPrice.USD).toLocaleString()}
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center md:flex-col md:w-1/5 md:items-start md:m-auto">
        <span className="text-sm font-medium text-secondary md:hidden">Date</span>
        <span className="text-base sm:text-xs font-mono truncate" title={new Date(atomicSwap.timestamp).toLocaleString()}>
          {new Date(atomicSwap.timestamp).toLocaleDateString()}
        </span>
      </div>

      <div className="flex justify-between items-center md:flex-col md:w-1/5 md:items-start md:m-auto">
        <span className="text-sm font-medium text-secondary md:hidden">Transaction</span>
        <a
          href={`https://horizon.market/explorer/tx/${atomicSwap.txid}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono truncate text-primary hover:underline"
          title={atomicSwap.txid}
        >
          {short_address(atomicSwap.txid)}
        </a>
      </div>
    </div>
  )
}

export const AtomicSwapItem = memo(AtomicSwapItemComponent)

