"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LastAtomicSwapsOrders = void 0;
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const react_router_dom_1 = require("react-router-dom");
const lucide_react_1 = require("lucide-react");
const index_js_1 = __importDefault(require("../../../core/index.js"));
const Media_component_js_1 = require("../Asset/Media.component.js");
const Loader_component_js_1 = require("../Loader/Loader.component.js");
const assetCache = new Map();
function LastAtomicSwapsOrdersComponent({ lastOrders, isLoading }) {
    const [assets, setAssets] = (0, react_2.useState)([]);
    const [btcPrice, setBtcPrice] = (0, react_2.useState)(0);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const getBtcPrice = (0, react_2.useCallback)(async () => {
        const [price] = await Promise.all([index_js_1.default.openbook.getBTCPrice()]);
        setBtcPrice(price);
    }, []);
    (0, react_2.useEffect)(() => {
        getBtcPrice();
    }, [getBtcPrice]);
    (0, react_2.useEffect)(() => {
        setAssets(lastOrders.filter((lastOrder) => lastOrder.status === "active").flatMap((lastOrder) => lastOrder.utxo_balance.map((utxo) => ({
            assetId: utxo.assetId,
            asset: assetCache.get(utxo.assetId) || undefined,
            qty: utxo.qty,
            unit_price: lastOrder.price / utxo.qty,
            total_price: lastOrder.price,
            seller: lastOrder.seller,
            txid: lastOrder.txid,
            timestamp: lastOrder.timestamp,
            psbt: lastOrder.psbt,
            block_index: lastOrder.block_index,
            status: lastOrder.status,
        }))));
    }, [lastOrders]);
    const loadAsset = (0, react_2.useCallback)(async (assetId) => {
        if (assetCache.has(assetId)) {
            setAssets((prev) => prev.map((item) => item.asset || item.assetId !== assetId ? item : { ...item, asset: assetCache.get(assetId) }));
            return;
        }
        try {
            const asset = await index_js_1.default.counterparty.getAsset({ asset: assetId });
            assetCache.set(assetId, asset);
            setAssets((prev) => prev.map((item) => (item.asset || item.assetId !== assetId ? item : { ...item, asset })));
        }
        catch (error) {
            console.error("Error fetching asset:", error);
        }
    }, []);
    (0, react_2.useEffect)(() => {
        for (const asset of assets) {
            if (!asset.asset) {
                loadAsset(asset.assetId);
            }
        }
    }, [assets, loadAsset]);
    function handleURLClick(assetId) {
        navigate(`/asset/${assetId}`);
    }
    if (isLoading) {
        return react_1.default.createElement(Loader_component_js_1.Loader, null);
    }
    if (assets.length === 0) {
        return null;
    }
    return (react_1.default.createElement("div", { className: "container mx-auto px-4 py-8" },
        react_1.default.createElement("h2", { className: "text-2xl font-bold mb-6 text-primary flex items-center" },
            react_1.default.createElement(lucide_react_1.ShoppingCart, { size: 24, className: "mr-2" }),
            react_1.default.createElement("span", null, "Atomic Swaps Open Orders")),
        react_1.default.createElement("div", { className: "overflow-x-auto" },
            react_1.default.createElement("table", { className: "w-full border-collapse" },
                react_1.default.createElement("thead", null,
                    react_1.default.createElement("tr", { className: "text-left border-b border-border" },
                        react_1.default.createElement("th", { className: "py-3 px-4 text-sm font-medium text-muted-foreground" }, "Asset"),
                        react_1.default.createElement("th", { className: "py-3 px-4 text-sm font-medium text-muted-foreground" }, "Qty"),
                        react_1.default.createElement("th", { className: "py-3 px-4 text-sm font-medium text-muted-foreground" }, "Unit Price"),
                        react_1.default.createElement("th", { className: "py-3 px-4 text-sm font-medium text-muted-foreground" }, "Price"),
                        react_1.default.createElement("th", { className: "py-3 px-4 text-sm font-medium text-muted-foreground" }, "Created"),
                        react_1.default.createElement("th", { className: "py-3 px-4 text-sm font-medium text-muted-foreground" }))),
                react_1.default.createElement("tbody", null, assets.map((asset) => (
                // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
                react_1.default.createElement("tr", { key: `${asset.assetId}-${asset.txid}`, onClick: () => handleURLClick(asset.assetId), className: "border-b cursor-pointer border-border hover:bg-muted/50 transition-colors" },
                    react_1.default.createElement("td", { className: "py-3 px-4" },
                        react_1.default.createElement("div", { className: "flex items-center space-x-3" },
                            react_1.default.createElement("div", { className: "w-12 h-12 flex-shrink-0" }, asset.asset ? (react_1.default.createElement(Media_component_js_1.Media, { asset: asset.asset, showStampIcon: false, className: "w-full h-full object-cover rounded border-primary" })) : (react_1.default.createElement("div", { className: "w-full h-full flex items-center justify-center bg-muted rounded" },
                                react_1.default.createElement(Loader_component_js_1.Loader, null)))),
                            react_1.default.createElement("span", { className: "font-medium" }, asset.asset?.asset || asset.assetId))),
                    react_1.default.createElement("td", { className: "py-3 px-4" }, asset.qty),
                    react_1.default.createElement("td", { className: "py-3 px-4" },
                        react_1.default.createElement("div", { className: "text-sm" },
                            `${Number(asset.unit_price).toLocaleString()} sat`,
                            react_1.default.createElement("div", { className: "text-xs text-muted-foreground" },
                                "$",
                                Number((asset.unit_price * 10 ** -8 * btcPrice).toFixed(2))))),
                    react_1.default.createElement("td", { className: "py-3 px-4" },
                        react_1.default.createElement("div", { className: "text-sm" },
                            Number(asset.total_price).toLocaleString(),
                            " sat",
                            react_1.default.createElement("div", { className: "text-xs text-muted-foreground" },
                                "$",
                                Number((asset.total_price * 10 ** -8 * btcPrice).toFixed(2))))),
                    react_1.default.createElement("td", { className: "py-3 px-4 text-sm text-muted-foreground" }, new Date(Number(asset.timestamp) * 1000).toLocaleDateString()),
                    react_1.default.createElement("td", { className: "py-3 px-4" }, asset.status === "active" ? react_1.default.createElement("span", null, "view") : react_1.default.createElement("span", null, "expired"))))))))));
}
exports.LastAtomicSwapsOrders = (0, react_2.memo)(LastAtomicSwapsOrdersComponent);
