import { memo } from "react"
import type { XCPAPIDispenser } from "@/lib/counterparty/api.d.ts"
import type { BTCPrice } from "@/lib/bitcoin/api.d.ts"

interface DispenserItemProps {
  dispenser: XCPAPIDispenser
  btcPrice: BTCPrice
}

function DispenserItemComponent({ dispenser, btcPrice }: DispenserItemProps) {
  return (
    <div className="flex flex-col p-4 space-y-4 transition-colors border rounded-lg border-primary hover:bg-light/5 md:flex-row md:space-y-0 md:gap-2 md:justify-between">
      <div className="flex justify-between items-center md:flex-col md:w-1/4 md:items-start md:m-auto">
        <span className="text-sm font-medium text-secondary md:hidden">Quantity</span>
        <div className="text-right md:text-left">
          <span
            className="text-base sm:text-xs font-mono font-semibold truncate"
            title={dispenser.give_quantity_normalized}
          >
            {Number(dispenser.give_quantity_normalized).toLocaleString()}
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center md:flex-col md:w-1/4 md:items-start md:m-auto">
        <span className="text-sm font-medium text-secondary md:hidden">Remaining</span>
        <div className="text-right md:text-left">
          <span
            className="text-base sm:text-xs font-mono font-semibold truncate"
            title={dispenser.give_remaining_normalized}
          >
            {Number(dispenser.give_remaining_normalized).toLocaleString()}
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center md:flex-col md:w-1/4 md:items-start md:m-auto">
        <span className="text-sm font-medium text-secondary md:hidden">Unit Price</span>
        <div className="text-right md:text-left">
          <span
            className="text-base sm:text-xs font-mono font-semibold truncate block"
            title={dispenser.price.toString()}
          >
            {dispenser.satoshi_price.toLocaleString()} sats
          </span>
          <span className="text-xs font-mono text-secondary truncate block" title={dispenser.price.toString()}>
            ${(dispenser.satoshi_price * 10 ** -8 * btcPrice.USD).toLocaleString()}
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center md:flex-col md:w-1/4 md:items-start md:m-auto">
        <span className="text-sm font-medium text-secondary md:hidden">Price</span>
        <div className="text-right md:text-left">
          <span
            className="text-base sm:text-xs font-mono font-semibold truncate block"
            title={dispenser.satoshirate.toString()}
          >
            {dispenser.satoshirate.toLocaleString()} sats
          </span>
          <span className="text-xs font-mono text-secondary truncate block" title={dispenser.price.toString()}>
            ${(dispenser.satoshirate * 10 ** -8 * btcPrice.USD).toLocaleString()}
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center md:flex-col md:w-1/4 md:items-start md:m-auto">
        <span className="text-sm font-medium text-secondary md:hidden">Date</span>
        <span
          className="text-base sm:text-xs font-mono truncate"
          title={new Date(dispenser.block_time * 1000).toLocaleString()}
        >
          {new Date(dispenser.block_time * 1000).toLocaleDateString()}
        </span>
      </div>
    </div>
  )
}

export const DispenserItem = memo(DispenserItemComponent)