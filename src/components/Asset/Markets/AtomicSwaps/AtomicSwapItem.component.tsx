import { memo } from "react"
import type { OpenbookAtomicSwapOrder, UtxoBalance } from "@/lib/openbook/api.d.ts"
import type { BTCPrice } from "@/lib/bitcoin/api.d.ts"
import {  useWallet } from "@/index.ts"
import { short_address } from "@/lib/utils/index.ts"
import { CancelOrderAction } from "@/components/Asset/Balance/actions/CancelOrder.component.tsx";
import { ConnectWalletAction } from "@/components/ConnectWallet/ConnectWalletAction.component.tsx";
import { UTXOBuyOrderAction } from "@/components/Asset/Balance/actions/UTXOBuy.component.tsx";


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
            ${(atomicSwap.price * 10 ** -8 * btcPrice).toLocaleString()}
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
        {walletAddress && walletAddress === atomicSwap.seller && atomicSwap.status === "active" && (
          <CancelOrderAction order={atomicSwap} />
        )}
        {walletAddress && walletAddress !== atomicSwap.seller && atomicSwap.status === "active" && (
          <UTXOBuyOrderAction order={atomicSwap} />
        )}
        {!walletAddress && (
          <ConnectWalletAction />
        )}
        {atomicSwap.status !== "active" && (
          <span className="w-full capitalize ml-10 sm:ml-2 text-sm text-primary rounded-lg p-2 bg-warning border border-primary text-light bg-primary transition-colors text-center font-mono truncate">
            {atomicSwap.status}
          </span>
        )}
      </div>
    </div>
  )
}

export const AtomicSwapItem = memo(AtomicSwapItemComponent)

