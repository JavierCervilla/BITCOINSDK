"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletView = void 0;
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const lucide_react_1 = require("lucide-react");
const index_js_1 = require("../../../../core/index.js");
const walletContext_js_1 = require("../../../context/walletContext.js");
const Loader_component_js_1 = require("../../Loader/Loader.component.js");
const ConnectWalletCTA_component_js_1 = require("../../ConnectWallet/ConnectWalletCTA.component.js");
const XCPAssetsBalance_component_js_1 = require("../../Wallet/XCPAssetsBalance.component.js");
function WalletView() {
    const { connected, walletAddress } = (0, walletContext_js_1.useWallet)();
    const [balance, setBalance] = (0, react_2.useState)([]);
    const [isLoading, setIsLoading] = (0, react_2.useState)(false);
    (0, react_2.useEffect)(() => {
        if (!walletAddress)
            return;
        setIsLoading(true);
        Promise.all([
            index_js_1.bitcoinsdk.counterparty.getBalance({ address: walletAddress }),
            index_js_1.bitcoinsdk.openbook.getBTCBalance({ address: walletAddress })
        ]).then(([xcpData, btcData]) => {
            setBalance({
                BTC: btcData,
                assets: xcpData
            });
            setIsLoading(false);
        });
    }, [walletAddress]);
    if (isLoading) {
        return react_1.default.createElement(Loader_component_js_1.Loader, null);
    }
    return (react_1.default.createElement("div", { className: "flex flex-col gap-6 p-4" },
        react_1.default.createElement("h1", { className: "text-2xl font-bold text-primary flex items-center gap-2" },
            react_1.default.createElement(lucide_react_1.WalletIcon, { className: "w-6 h-6" }),
            "Your Wallet"),
        react_1.default.createElement(XCPAssetsBalance_component_js_1.XCPAssetsBalance, { assets: balance.assets }),
        !connected && (react_1.default.createElement(ConnectWalletCTA_component_js_1.ConnectWalletCTA, null))));
}
exports.WalletView = WalletView;
