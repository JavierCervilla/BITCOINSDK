import { useState, useEffect, useCallback } from "react";
import type * as OpenbookAPI from "@/lib/openbook/api.d.ts";
import type * as XCPAPI from "@/lib/counterparty/api.d.ts";
import { bitcoinsdk } from "@/lib/index.ts";
import type { BTCPrice } from "@/lib/bitcoin/api.d.ts";
import { RecentSales } from "@/components/Asset/RecentSales/RecentSales.component.tsx";
import { MarketInfo } from "@/components/Asset/Markets/MarketInfo.component.tsx";
import { Loader } from "@/components/Loader/Loader.component.tsx";

export function MarketSection({ asset }: { asset: string }) {
  const [swapSales, setSwapSales] = useState<OpenbookAPI.OpenbookAtomicSwap[]>([]);
  const [swapOrders, setSwapOrders] = useState<OpenbookAPI.OpenbookAtomicSwap[]>([]);
  const [dispenses, setDispenses] = useState<XCPAPI.XCPAPIDispenser[]>([]);
  const [dispensers, setDispensers] = useState<XCPAPI.XCPAPIDispenser[]>([]);
  const [btcPrice, setBtcPrice] = useState<BTCPrice | null>(null);
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
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [asset]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);


  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <MarketInfo asset={asset} btcPrice={btcPrice} swaps={swapOrders} dispensers={dispensers} isLoading={isLoading} />
      <RecentSales asset={asset} btcPrice={btcPrice} swaps={swapSales} dispenses={dispenses} isLoading={isLoading} />
    </div>
  );
}
