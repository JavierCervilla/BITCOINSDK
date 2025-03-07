"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Header = void 0;
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const lucide_react_1 = require("lucide-react");
const index_js_1 = require("../../../core/index.js");
const ConnectWallet_component_js_1 = require("../ConnectWallet/ConnectWallet.component.js");
const index_js_2 = require("../../index.js");
const walletContext_js_1 = require("../../context/walletContext.js");
const HamburgerMenu_component_js_1 = require("../HamburgerMenu/HamburgerMenu.component.js");
const style_js_1 = require("../../utils/style.js");
const CryptoInfo = ({ data }) => {
    const isPositive = data.price_change_percentage_24h >= 0;
    const TrendIcon = isPositive ? lucide_react_1.TrendingUp : lucide_react_1.TrendingDown;
    return (react_1.default.createElement("div", { className: "flex items-center gap-2 text-nowrap flex-nowrap px-4" },
        react_1.default.createElement("img", { src: data.icon || "/placeholder.svg", alt: data.id, className: "w-6 h-6" }),
        react_1.default.createElement("div", { className: "flex items-center align-baseline space-x-2" },
            react_1.default.createElement("span", { className: "hidden lg:block text-xs font-black text-muted-foreground uppercase" }, data.symbol),
            react_1.default.createElement("span", { className: "text-xs font-bold" }, data.current_price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
            })),
            react_1.default.createElement("div", { className: (0, style_js_1.cn)("flex text-xs items-center", isPositive ? "text-green-500" : "text-red-500") },
                react_1.default.createElement(TrendIcon, { className: "w-4 h-4" }),
                react_1.default.createElement("span", { className: "text-sm font-medium" },
                    Math.abs(data.price_change_percentage_24h).toFixed(2),
                    "%")))));
};
const BalanceInfo = ({ balance, symbol }) => {
    const iconColor = symbol.toLowerCase() === 'btc' ? 'text-[#F7931A]' : 'text-[#FF3B9A]';
    return (react_1.default.createElement("div", { className: "flex items-center space-x-2" },
        react_1.default.createElement(lucide_react_1.Wallet, { className: `w-4 h-4 ${iconColor}` }),
        react_1.default.createElement("span", { className: "text-xs font-medium" }, balance?.toFixed(symbol.toUpperCase() === "BTC" ? 4 : 2))));
};
function Header() {
    const { walletAddress, connected } = (0, walletContext_js_1.useWallet)();
    const [cryptoData, setCryptoData] = (0, react_2.useState)([]);
    const [balances, setBalances] = (0, react_2.useState)(null);
    const fetchBalances = (0, react_2.useCallback)(async (address) => {
        const [xcpData, btcData] = await Promise.all([
            index_js_1.bitcoinsdk.counterparty.getTokenBalance({ asset: 'XCP', address }),
            index_js_1.bitcoinsdk.openbook.getBTCBalance({ address })
        ]);
        setBalances({
            BTC: btcData,
            XCP: Number(xcpData[0]?.qty_normalized) || 0
        });
    }, []);
    (0, react_2.useEffect)(() => {
        index_js_1.bitcoinsdk.openbook.getMarketData().then((data) => {
            setCryptoData(data);
        });
    }, []);
    (0, react_2.useEffect)(() => {
        if (!walletAddress)
            return;
        fetchBalances(walletAddress);
    }, [walletAddress, fetchBalances]);
    return (react_1.default.createElement("div", { className: "w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" },
        react_1.default.createElement("div", { className: "flex max-w-full min-w-fit flex-col lg:flex-row items-center justify-between px-4 py-3 lg:px-6 gap-4 mx-auto" },
            react_1.default.createElement("div", { className: "flex flex-col w-full sm:flex-row gap-4 p-3 rounded-lg border border-border/50" }, cryptoData.map((crypto, index) => (react_1.default.createElement("div", { key: crypto.id, className: `flex w-full justify-around items-center sm:items-center gap-3 
                  ${index < cryptoData.length - 1 ? 'sm:border-r sm:border-border/50 sm:pr-4' : ''}` },
                react_1.default.createElement(CryptoInfo, { data: crypto }),
                connected && balances && (react_1.default.createElement(BalanceInfo, { balance: balances[crypto.symbol.toUpperCase()], symbol: crypto.symbol })))))),
            react_1.default.createElement("div", { className: "flex items-center justify-between lg:justify-end w-full gap-3" },
                react_1.default.createElement(HamburgerMenu_component_js_1.HamburgerMenu, null),
                react_1.default.createElement(ConnectWallet_component_js_1.ConnectWalletButton, { wallets: index_js_2.walletConfig, className: "cursor-pointer hover:bg-primary hover:text-light important py-2.5 min-w-fit px-4 bg-light border border-primary text-nowrap text-primary hover:bg-primary hover:scale-105 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-300" })))));
}
exports.Header = Header;
