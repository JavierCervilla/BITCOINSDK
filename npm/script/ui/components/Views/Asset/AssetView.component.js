"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetView = void 0;
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const lucide_react_1 = require("lucide-react");
const react_router_dom_1 = require("react-router-dom");
const index_js_1 = require("../../../../core/index.js");
const Loader_component_js_1 = require("../../Loader/Loader.component.js");
const Media_component_js_1 = require("../../Asset/Media.component.js");
const AssetInfo_component_js_1 = require("../../Asset/AssetInfo.component.js");
const BalanceSection_component_js_1 = require("../../Asset/Balance/BalanceSection.component.js");
const MarketSection_js_1 = require("../../Asset/MarketSection.js");
function AssetView() {
    const { assetid } = (0, react_router_dom_1.useParams)();
    const [isLoading, setIsLoading] = (0, react_2.useState)(false);
    const [asset, setAsset] = (0, react_2.useState)(null);
    const [btcPrice, setBtcPrice] = (0, react_2.useState)(null);
    const fetchData = (0, react_2.useCallback)(async () => {
        setIsLoading(true);
        const [btcPrice, asset] = await Promise.all([
            index_js_1.bitcoinsdk.openbook.getBTCPrice(),
            index_js_1.bitcoinsdk.counterparty.getAsset({ asset: assetid })
        ]);
        console.log({ btcPrice });
        setAsset(asset);
        setBtcPrice(btcPrice);
        setIsLoading(false);
    }, [assetid]);
    (0, react_2.useEffect)(() => {
        fetchData();
    }, [fetchData]);
    if (isLoading) {
        return react_1.default.createElement(Loader_component_js_1.Loader, null);
    }
    return (react_1.default.createElement("div", { className: "flex flex-col gap-6 p-4" },
        react_1.default.createElement("h1", { className: "text-2xl font-bold text-primary flex items-center gap-2" },
            react_1.default.createElement(lucide_react_1.BookImage, { className: "w-6 h-6" }),
            assetid),
        react_1.default.createElement("div", { className: "flex flex-col lg:flex-row gap-4 max-h-[480px]" },
            react_1.default.createElement("div", { className: "flex flex-col gap-4  min-w-1/3 lg:max-w-[400px] max-w-none" },
                react_1.default.createElement("div", { className: "flex flex-col gap-2 p-1 border border-secondary rounded-lg " },
                    react_1.default.createElement(Media_component_js_1.Media, { className: "w-full h-auto bg-transparent border-none rounded-lg transition-transform duration-300 group-hover:scale-110 max-h-[390px]", asset: { asset: asset?.asset, name: asset?.asset_longname, description: asset?.description } }),
                    react_1.default.createElement(AssetInfo_component_js_1.AssetInfo, { asset: asset })),
                react_1.default.createElement("div", { className: "flex flex-col gap-4 p-1 border border-secondary rounded-lg" },
                    react_1.default.createElement(BalanceSection_component_js_1.BalanceSection, { asset: assetid, btcPrice: btcPrice || 0 }))),
            react_1.default.createElement(MarketSection_js_1.MarketSection, { asset: assetid, supply: Number(asset?.supply_normalized) || 0, btcPrice: btcPrice || 0 }))));
}
exports.AssetView = AssetView;
