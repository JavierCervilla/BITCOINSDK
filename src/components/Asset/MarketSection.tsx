import { useState, useEffect, useCallback } from "react";
import type * as OpenbookAPI from "@/lib/openbook/api.d.ts";
import type * as XCPAPI from "@/lib/counterparty/api.d.ts";
import { bitcoinsdk } from "@/lib/index.ts";
import type { BTCPrice } from "@/lib/bitcoin/api.d.ts";
import { RecentSales } from "@/components/Asset/RecentSales/RecentSales.component.tsx";
import { MarketInfo } from "@/components/Asset/Markets/MarketInfo.component.tsx";


interface MarketSectionProps {
  asset: string
  supply: number
}


interface GetMarketCapParams {
  asset: string
  supply: number
  dispensers: XCPAPI.XCPAPIDispenser[]
  dispenses: XCPAPI.XCPAPIDispense[]
  atomicSwapSales: OpenbookAPI.OpenbookAtomicSwap[]
  atomicSwapOrders: OpenbookAPI.OpenbookAtomicSwapOrder[]
}

function getMarketCap({
  asset,
  supply,
  dispensers,
  dispenses,
  atomicSwapSales,
  atomicSwapOrders
}: GetMarketCapParams) {
  if (!atomicSwapOrders.length && !dispensers.length) {
    const lastSale = [dispensers[0], atomicSwapSales[0]].sort((a, b) => b.block_index - a.block_index)[0]
    if ('unit_price' in lastSale && lastSale.unit_price) {
      const floor_price = lastSale.unit_price * 10 ** -8;
      return floor_price * supply;
    }
    if ('satoshirate_normalized' in lastSale && lastSale.satoshirate_normalized) {
      const floor_price = Number(lastSale.satoshirate_normalized);
      return floor_price * supply;
    }
    return 0;
  }
  const floor_price_dispenser = dispenses.length > 0
    ? dispensers.reduce((minPrice, dispenser) => {
      if (Number(dispenser.give_quantity_normalized) < 1) {
        return dispenser.satoshirate / Number(dispenser.give_quantity_normalized) * 10 ** 8 < minPrice ? dispenser.satoshirate / Number(dispenser.give_quantity_normalized) * 10 ** 8 : minPrice;
      }
      return dispenser.satoshirate < minPrice ? dispenser.satoshirate : minPrice;
    }, Number.POSITIVE_INFINITY)
    : 0;

  const floor_price_atomic_swap = atomicSwapOrders.length > 0
    ? atomicSwapOrders.reduce((minPrice, atomicSwap) => {
      const asset_qty = Number(atomicSwap.utxo_balance.find(utxo => utxo.assetId === asset)?.qty);
      const unit_price = Number(atomicSwap.price / asset_qty);
      return Number(unit_price) < minPrice ? Number(unit_price) : minPrice;
    }, Number.POSITIVE_INFINITY)
    : 0;
  let floor_price = Math.max(floor_price_dispenser, floor_price_atomic_swap);
  if (floor_price_dispenser > 0 && floor_price_atomic_swap > 0) {
    floor_price = Math.min(floor_price_dispenser, floor_price_atomic_swap);
  }

  return (floor_price * supply) * 10 ** -8;
}

interface GetBTCVolumeParams {
  atomicSwapSales: OpenbookAPI.OpenbookAtomicSwap[]
  dispenses: XCPAPI.XCPAPIDispense[]
  asset: string
}

function getBTCVolume({ atomicSwapSales, dispenses, asset }: GetBTCVolumeParams) {
  const atomicSwapVolume = atomicSwapSales.reduce((acc, sale) => acc + Number(sale.total_price), 0) * 10 ** -8;
  const dispenserVolume = dispenses.reduce((acc, dispense) => acc + Number(Number(dispense.dispense_quantity_normalized) * Number(dispense.dispenser.satoshirate_normalized)), 0) * 10 ** -8;
  return atomicSwapVolume + dispenserVolume;
}

export function MarketSection({ asset, supply }: MarketSectionProps) {
  const [swapSales, setSwapSales] = useState<OpenbookAPI.OpenbookAtomicSwap[]>([]);
  const [swapOrders, setSwapOrders] = useState<OpenbookAPI.OpenbookAtomicSwap[]>([]);
  const [dispenses, setDispenses] = useState<XCPAPI.XCPAPIDispenser[]>([]);
  const [dispensers, setDispensers] = useState<XCPAPI.XCPAPIDispenser[]>([]);
  const [btcPrice, setBtcPrice] = useState<BTCPrice | null>(null);
  const [mcap, setMcap] = useState<number | null>(null);
  const [volume, setVolume] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [swapSalesData, dispensesData, swapOrdersData, dispensersData, btc_price] = await Promise.all([
        bitcoinsdk.openbook.getAtomicSalesByAsset({ asset }),
        bitcoinsdk.counterparty.getDispenses({ asset }),
        bitcoinsdk.openbook.getAtomicSwapOrdersByAsset({ asset }),
        bitcoinsdk.counterparty.getDispensers({ asset }),
        bitcoinsdk.bitcoin.getBTCPrice(),
      ]);

      setSwapSales(swapSalesData.result);
      setDispenses(dispensesData);
      setSwapOrders(swapOrdersData.result);
      setDispensers(dispensersData);
      setBtcPrice(btc_price);
      setMcap(getMarketCap({
        asset,
        supply,
        dispensers: dispensersData,
        dispenses: dispensesData,
        atomicSwapSales: swapSalesData.result,
        atomicSwapOrders: swapOrdersData.result
      }));
      setVolume(getBTCVolume({
        atomicSwapSales: swapSalesData.result,
        dispenses: dispensesData,
        asset
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [asset, supply]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="flex flex-col gap-4 w-full">
      <MarketInfo asset={asset} btcPrice={btcPrice} swaps={swapOrders} dispensers={dispensers} isLoading={isLoading} mcap={mcap} volume={volume} />
      <RecentSales asset={asset} btcPrice={btcPrice} swaps={swapSales} dispenses={dispenses} isLoading={isLoading} />
    </div>
  );
}
