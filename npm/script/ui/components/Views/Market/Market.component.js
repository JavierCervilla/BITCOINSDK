"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketView = void 0;
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const lucide_react_1 = require("lucide-react");
const api_2_js_1 = require("../../../../core/openbook/api_2.js");
const Loader_component_js_1 = require("../../Loader/Loader.component.js");
const LastAtomicSwapsSales_component_js_1 = require("../../Market/LastAtomicSwapsSales.component.js");
const LastAtomicSwapsOrders_component_js_1 = require("../../Market/LastAtomicSwapsOrders.component.js");
const ChartViewer_component_js_1 = require("../../Charts/ChartViewer.component.js");
function MarketView() {
    const [lastOrders, setLastOrders] = (0, react_2.useState)([]);
    const [lastSales, setLastSales] = (0, react_2.useState)([]);
    const [isLoading, setIsLoading] = (0, react_2.useState)(false);
    (0, react_2.useEffect)(() => {
        setIsLoading(true);
        Promise.all([
            api_2_js_1.openbook.getAtomicSwapOrders({ limit: 1000 }),
            api_2_js_1.openbook.getAtomicSales({ limit: 1000 })
        ]).then(([lastSwapOrders, lastSwapSales]) => {
            setLastOrders(lastSwapOrders.result);
            setLastSales(lastSwapSales.result);
            setIsLoading(false);
        });
    }, []);
    if (isLoading) {
        return react_1.default.createElement(Loader_component_js_1.Loader, null);
    }
    if (isLoading) {
        return react_1.default.createElement(Loader_component_js_1.Loader, null);
    }
    return (react_1.default.createElement("div", { className: "flex flex-col gap-6 p-4" },
        react_1.default.createElement("h1", { className: "text-2xl font-bold text-primary flex items-center gap-2" },
            react_1.default.createElement(lucide_react_1.BarChart2, { className: "w-6 h-6" }),
            "Market Overview"),
        react_1.default.createElement("div", { className: "flex flex-col gap-4" },
            react_1.default.createElement(ChartViewer_component_js_1.ChartViewer, { url: "https://openbook.0.srcpad.pro/api/v1/charts/summary" }),
            react_1.default.createElement(LastAtomicSwapsSales_component_js_1.LastAtomicSwapsSales, { lastSales: lastSales }),
            react_1.default.createElement(LastAtomicSwapsOrders_component_js_1.LastAtomicSwapsOrders, { lastOrders: lastOrders }))));
}
exports.MarketView = MarketView;
