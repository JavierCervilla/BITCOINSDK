import { memo } from "react"
import type { OpenbookAtomicSwapOrder, UtxoBalance } from "@/lib/openbook/api.d.ts"
import type { BTCPrice } from "@/lib/bitcoin/api.d.ts"
import { useWallet } from "@/index.ts"
import { short_address } from "@/lib/utils/index.ts"

interface AtomicSwapItemProps {
  atomicSwap: OpenbookAtomicSwapOrder
  btcPrice: BTCPrice
}

function AtomicSwapItemComponent({ atomicSwap, btcPrice }: Readonly<AtomicSwapItemProps>) {
  const { walletAddress } = useWallet()

  return (
    <div className="flex flex-col p-4 space-y-4 transition-colors border rounded-lg border-primary md:flex-row md:space-y-0 md:gap-2 md:justify-between">
      <div className="flex justify-between items-center md:flex-col md:w-1/5 md:items-start md:m-auto">
        <span className="text-sm font-medium text-secondary md:hidden">Quantity</span>
        <div className="text-right md:text-left">
          {atomicSwap.utxo_balance.map((balance: UtxoBalance) => (
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
        <span className="text-sm font-medium text-secondary md:hidden">Price</span>
        <div className="text-right md:text-left">
          <span
            className="text-base sm:text-xs font-mono font-semibold truncate block"
            title={atomicSwap.price.toString()}
          >
            {atomicSwap.price.toLocaleString()} sats
          </span>
          <span className="text-xs font-mono text-secondary truncate block" title={atomicSwap.price.toString()}>
            ${(atomicSwap.price * 10 ** -8 * btcPrice.USD).toLocaleString()}
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center md:flex-col md:w-1/5 md:items-start md:m-auto">
        <span className="text-sm font-medium text-secondary md:hidden">Seller</span>
        <span className="text-base sm:text-xs font-mono truncate" title={atomicSwap.seller}>
          {short_address(atomicSwap.seller)}
        </span>
      </div>

      <div className="flex justify-between items-center md:flex-col md:w-1/5 md:items-start md:m-auto">
        <span className="text-sm font-medium text-secondary md:hidden">Date</span>
        <span
          className="text-base sm:text-xs font-mono truncate"
          title={new Date(Number(atomicSwap.timestamp) * 1000).toLocaleString()}
        >
          {new Date(Number(atomicSwap.timestamp) * 1000).toLocaleDateString()}
        </span>
      </div>

      <div className="flex justify-between items-center md:flex-col md:w-1/5 md:items-start md:m-auto">
        <span className="text-sm font-medium text-secondary md:hidden">Action</span>
        <button
          className="cursor-pointer text-sm text-primary rounded-lg p-2 bg-light border border-primary hover:bg-primary hover:text-light transition-colors font-mono truncate"
          type="button"
        >
          {atomicSwap.seller === walletAddress ? "Cancel" : "Buy"}
        </button>
      </div>
    </div>
  )
}

export const AtomicSwapItem = memo(AtomicSwapItemComponent)

