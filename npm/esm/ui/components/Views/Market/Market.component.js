import React from "react";
import { useEffect, useState } from "react";
import { BarChart2 } from "lucide-react";
import { openbook } from "../../../../core/openbook/api_2.js";
import { Loader } from "../../Loader/Loader.component.js";
import { LastAtomicSwapsSales } from "../../Market/LastAtomicSwapsSales.component.js";
import { LastAtomicSwapsOrders } from "../../Market/LastAtomicSwapsOrders.component.js";
import { ChartViewer } from "../../Charts/ChartViewer.component.js";
export function MarketView() {
    const [lastOrders, setLastOrders] = useState([]);
    const [lastSales, setLastSales] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        Promise.all([
            openbook.getAtomicSwapOrders({ limit: 1000 }),
            openbook.getAtomicSales({ limit: 1000 })
        ]).then(([lastSwapOrders, lastSwapSales]) => {
            setLastOrders(lastSwapOrders.result);
            setLastSales(lastSwapSales.result);
            setIsLoading(false);
        });
    }, []);
    if (isLoading) {
        return React.createElement(Loader, null);
    }
    if (isLoading) {
        return React.createElement(Loader, null);
    }
    return (React.createElement("div", { className: "flex flex-col gap-6 p-4" },
        React.createElement("h1", { className: "text-2xl font-bold text-primary flex items-center gap-2" },
            React.createElement(BarChart2, { className: "w-6 h-6" }),
            "Market Overview"),
        React.createElement("div", { className: "flex flex-col gap-4" },
            React.createElement(ChartViewer, { url: "https://openbook.0.srcpad.pro/api/v1/charts/summary" }),
            React.createElement(LastAtomicSwapsSales, { lastSales: lastSales }),
            React.createElement(LastAtomicSwapsOrders, { lastOrders: lastOrders }))));
}
