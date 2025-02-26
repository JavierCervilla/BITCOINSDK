import React from "react";
import { useState, useEffect, useCallback } from "react";
import { bitcoinsdk } from "../../../core/index.js";
import { RecentSales } from "./RecentSales/RecentSales.component.js";
import { MarketInfo } from "./Markets/MarketInfo.component.js";
function getMarketCap({ asset, supply, dispensers, dispenses, atomicSwapSales, atomicSwapOrders }) {
    if (!atomicSwapOrders.length && !dispensers.length) {
        const lastSale = [dispensers[0], atomicSwapSales[0]].sort((a, b) => b.block_index - a.block_index)[0];
        if (lastSale && 'unit_price' in lastSale && lastSale.unit_price) {
            const floor_price = lastSale.unit_price * 10 ** -8;
            return floor_price * supply;
        }
        if (lastSale && 'satoshirate_normalized' in lastSale && lastSale.satoshirate_normalized) {
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
function getBTCVolume({ atomicSwapSales, dispenses }) {
    const atomicSwapVolume = atomicSwapSales.reduce((acc, sale) => acc + Number(sale.total_price), 0) * 10 ** -8;
    console.log(dispenses[0]);
    const dispenserVolume = dispenses.reduce((acc, dispense) => acc + Number(Number(dispense.dispense_quantity_normalized) * Number(dispense.dispenser.satoshirate_normalized)), 0);
    console.log({ atomicSwapVolume, dispenserVolume });
    return atomicSwapVolume + dispenserVolume;
}
export function MarketSection({ asset, supply, btcPrice }) {
    const [swapSales, setSwapSales] = useState([]);
    const [swapOrders, setSwapOrders] = useState([]);
    const [dispenses, setDispenses] = useState([]);
    const [dispensers, setDispensers] = useState([]);
    const [mcap, setMcap] = useState(null);
    const [volume, setVolume] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const [swapSalesData, dispensesData, swapOrdersData, dispensersData] = await Promise.all([
                bitcoinsdk.openbook.getAtomicSalesByAsset({ asset }),
                bitcoinsdk.counterparty.getDispenses({ asset }),
                bitcoinsdk.openbook.getAtomicSwapOrdersByAsset({ asset }),
                bitcoinsdk.counterparty.getDispensers({ asset }),
            ]);
            setSwapSales(swapSalesData.result);
            setDispenses(dispensesData);
            setSwapOrders(swapOrdersData.result.filter(order => order.status === "active"));
            setDispensers(dispensersData);
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
            }));
        }
        catch (error) {
            console.error("Error fetching data:", error);
        }
        finally {
            setIsLoading(false);
        }
    }, [asset, supply]);
    useEffect(() => {
        fetchData();
    }, [fetchData]);
    return (React.createElement("div", { className: "flex flex-col gap-4 w-full" },
        React.createElement(MarketInfo, { asset: asset, btcPrice: btcPrice, swaps: swapOrders, dispensers: dispensers, isLoading: isLoading, mcap: mcap, volume: volume }),
        React.createElement(RecentSales, { asset: asset, btcPrice: btcPrice, swaps: swapSales, dispenses: dispenses, isLoading: isLoading })));
}
