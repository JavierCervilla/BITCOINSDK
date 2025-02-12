import type { XCPAPIDispense } from "@/lib/counterparty/api.d.ts"
import type { BTCPrice } from "@/lib/bitcoin/api.d.ts";

interface DispenseItemProps {
  dispense: XCPAPIDispense
  btcPrice: BTCPrice
}

export function DispenseItem({ dispense, btcPrice }: DispenseItemProps) {
  return (
    <div className="flex flex-col md:flex-row gap-2 p-4 justify-between transition-colors border rounded-lg md:border-b border-primary hover:bg-light/5">
      <div className="flex flex-col md:w-1/4 gap-1 m-auto">
        <span className="text-xs font-medium md:hidden">Quantity:</span>
        <span className="text-sm font-mono truncate" title={dispense.dispense_quantity_normalized}>
          {Number(dispense.dispense_quantity_normalized).toLocaleString()}
        </span>
      </div>

      <div className="flex flex-col md:w-1/4 gap-1 m-auto">
        <span className="text-xs font-medium md:hidden">Unit Price:</span>
        <span className="text-sm font-mono truncate" title={dispense.dispenser.satoshi_price.toString()}>
          {(dispense.dispenser.satoshi_price).toLocaleString()} sats
        </span>
        <span className="text-sm font-mono truncate" title={dispense.dispenser.satoshi_price.toString()}>
          {(dispense.dispenser.satoshi_price * 10 ** -8 * btcPrice.USD).toLocaleString()} $
        </span>
      </div>

      <div className="flex flex-col md:w-1/4 gap-1 m-auto">
        <span className="text-xs font-medium md:hidden">Price:</span>
        <span className="text-sm font-mono truncate" title={dispense.btc_amount.toString()}>
          {dispense.btc_amount.toLocaleString()} sats
        </span>
        <span className="text-sm font-mono truncate" title={dispense.dispenser.satoshi_price.toString()}>
          {(dispense.btc_amount * 10 ** -8 * btcPrice.USD).toLocaleString()} $
        </span>
      </div>

      <div className="flex flex-col md:w-1/4 gap-1 m-auto">
        <span className="text-xs font-medium md:hidden">Date:</span>
        <span className="text-sm font-mono truncate" title={new Date(dispense.block_time * 1000).toLocaleString()}>
          {new Date(dispense.block_time * 1000).toLocaleDateString()}
        </span>
      </div>
    </div>
  )
}
