"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LastAtomicSwapsSales = void 0;
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const react_router_dom_1 = require("react-router-dom");
const lucide_react_1 = require("lucide-react");
const index_js_1 = __importDefault(require("../../../core/index.js"));
const Loader_component_js_1 = require("../Loader/Loader.component.js");
const Media_component_js_1 = require("../Asset/Media.component.js");
const Carousel_component_js_1 = require("../Carousel/Carousel.component.js");
const assetCache = new Map();
function LastAtomicSwapsSalesComponent({ lastSales, isLoading }) {
    const [assets, setAssets] = (0, react_2.useState)([]);
    const [loadingAssets, setLoadingAssets] = (0, react_2.useState)(new Set());
    const [btcPrice, setBtcPrice] = (0, react_2.useState)(0);
    const observer = (0, react_2.useRef)(null);
    const navigate = (0, react_router_dom_1.useNavigate)();
    (0, react_2.useEffect)(() => {
        index_js_1.default.openbook.getBTCPrice().then((price) => setBtcPrice(price ?? 0));
    }, []);
    (0, react_2.useEffect)(() => {
        setAssets(lastSales.flatMap((lastSale) => lastSale.utxo_balance.map((utxo) => ({
            assetId: utxo.assetId,
            asset: assetCache.get(utxo.assetId) || undefined,
            qty: utxo.qty,
            unit_price: lastSale.unit_price,
            total_price: lastSale.total_price,
            seller: lastSale.seller,
            buyer: lastSale.buyer,
            txid: lastSale.txid,
            timestamp: lastSale.timestamp,
            block_hash: lastSale.block_hash,
            block_index: lastSale.block_index,
        }))));
    }, [lastSales]);
    const loadAsset = (0, react_2.useCallback)(async (index, assetId) => {
        if (loadingAssets.has(index) || assetCache.has(assetId)) {
            setAssets((prev) => prev.map((item) => item.asset || item.assetId !== assetId ? item : { ...item, asset: assetCache.get(assetId) }));
            return;
        }
        setLoadingAssets((prev) => new Set(prev).add(index));
        try {
            const asset = await index_js_1.default.counterparty.getAsset({ asset: assetId });
            assetCache.set(assetId, asset);
            setAssets((prev) => prev.map((item) => item.asset || item.assetId !== assetId ? item : { ...item, asset }));
        }
        catch (error) {
            console.error("Error fetching asset:", error);
        }
        finally {
            setLoadingAssets((prev) => {
                const newSet = new Set(prev);
                newSet.delete(index);
                return newSet;
            });
        }
    }, [loadingAssets]);
    (0, react_2.useEffect)(() => {
        observer.current = new IntersectionObserver((entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    const index = Number(entry.target.getAttribute("data-index"));
                    const assetIds = assets.map((asset) => asset.assetId);
                    for (let i = index; i < index + 3 && i < assetIds.length; i++) {
                        if (assetIds[i]) {
                            loadAsset(i, assetIds[i]);
                        }
                    }
                }
            }
        }, { threshold: 0.5 });
        const elements = document.querySelectorAll(".asset-card");
        for (const el of elements) {
            observer.current?.observe(el);
        }
        return () => observer.current?.disconnect();
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
    return (react_1.default.createElement("div", { className: "relative" },
        react_1.default.createElement("h2", { className: "text-xl font-bold text-left text-primary flex flex-row items-center" },
            react_1.default.createElement(lucide_react_1.ChartNoAxesCombined, { size: 24, className: "mr-2" }),
            react_1.default.createElement("span", { className: "text-primary" }, "Last Atomic Swaps Sales")),
        react_1.default.createElement(Carousel_component_js_1.Carousel, { items: assets, itemKey: (item) => `${item.assetId}-${item.txid}`, renderItem: (asset) => (react_1.default.createElement("button", { type: "button", onClick: () => handleURLClick(asset.assetId), className: "w-[240px] h-[240px] snap-center cursor-pointer" },
                react_1.default.createElement("div", { className: "relative w-full h-full overflow-hidden rounded-lg bg-primary group" }, asset.asset ? (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement("div", { className: "absolute inset-0 flex items-center justify-center" },
                        react_1.default.createElement(Media_component_js_1.Media, { asset: asset.asset, className: "w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 border-primary rounded-lg" })),
                    react_1.default.createElement("div", { className: "absolute text-left inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity border-none duration-300 flex items-end rounded-lg" },
                        react_1.default.createElement("div", { className: "text-white text-sm truncate w-full bg-light p-2 rounded-b-lg border border-primary" },
                            react_1.default.createElement("div", { className: "flex flex-row items-center justify-between" },
                                react_1.default.createElement("p", { className: "font-bold truncate" }, asset.asset.asset),
                                react_1.default.createElement("p", { className: "text-xs opacity-75 truncate" }, new Date(asset.timestamp).toLocaleDateString())),
                            react_1.default.createElement("p", { className: "text-xs opacity-75 truncate font-mono" },
                                react_1.default.createElement("span", { className: "text-primary" }, asset.qty),
                                " sold for",
                                " ",
                                react_1.default.createElement("span", { className: "text-primary" },
                                    Number(asset.total_price).toLocaleString(),
                                    " sats ($",
                                    Number((asset.total_price * 10 ** -8 * btcPrice).toFixed(2)).toLocaleString(),
                                    ")")))))) : (react_1.default.createElement("div", { className: "w-full h-full flex items-center justify-center text-white" },
                    react_1.default.createElement(Loader_component_js_1.Loader, null)))))) })));
}
exports.LastAtomicSwapsSales = (0, react_2.memo)(LastAtomicSwapsSalesComponent);
