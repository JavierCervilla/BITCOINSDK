"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceSection = void 0;
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const lucide_react_1 = require("lucide-react");
const index_js_1 = require("../../../../core/index.js");
const index_js_2 = require("../../../index.js");
const index_js_3 = require("../../../utils/index.js");
const Loader_component_js_1 = require("../../Loader/Loader.component.js");
const BalanceControl_component_js_1 = require("./actions/BalanceControl.component.js");
const AccountSend_component_js_1 = require("./actions/AccountSend.component.js");
const UTXOSend_component_js_1 = require("./actions/UTXOSend.component.js");
const UTXOAttach_component_js_1 = require("./actions/UTXOAttach.component.js");
const UTXODetach_component_js_1 = require("./actions/UTXODetach.component.js");
const modalContext_js_1 = require("../../../context/modalContext.js");
const Modal_component_js_1 = require("../../Modal/Modal.component.js");
const UTXOList_component_js_1 = require("./actions/UTXOList.component.js");
function AccountBalanceControls({ balance, btcPrice: _btcPrice }) {
    const { walletAddress } = (0, index_js_2.useWallet)();
    if (!walletAddress)
        return null;
    return (react_1.default.createElement("div", { className: "flex items-center gap-2" },
        react_1.default.createElement(BalanceControl_component_js_1.BalanceControl, { icon: lucide_react_1.Send, label: "Send", action: react_1.default.createElement(AccountSend_component_js_1.AccountSendAction, { balance: balance }) }),
        react_1.default.createElement(BalanceControl_component_js_1.BalanceControl, { icon: lucide_react_1.Link, label: "Attach to UTXO", action: react_1.default.createElement(UTXOAttach_component_js_1.UTXOAttachAction, { balance: balance }) })));
}
function UtxoBalanceControls({ balance, btcPrice, orders }) {
    const { walletAddress } = (0, index_js_2.useWallet)();
    if (!walletAddress)
        return null;
    return (react_1.default.createElement("div", { className: "flex items-center gap-2" },
        react_1.default.createElement(BalanceControl_component_js_1.BalanceControl, { icon: lucide_react_1.Send, label: "Send", action: react_1.default.createElement(UTXOSend_component_js_1.UTXOSendAction, { balance: balance }) }),
        react_1.default.createElement(BalanceControl_component_js_1.BalanceControl, { icon: lucide_react_1.Unlink, label: "Detach from UTXO", action: react_1.default.createElement(UTXODetach_component_js_1.UTXODetachAction, { balance: balance }) }),
        orders.length > 0 && orders.find(order => order.utxo === balance.utxo) ?
            null
            : (react_1.default.createElement(BalanceControl_component_js_1.BalanceControl, { icon: lucide_react_1.BadgeDollarSign, label: "Sell Item", action: react_1.default.createElement(UTXOList_component_js_1.ListUTXOAction, { balance: balance, btcPrice: btcPrice }) }))));
}
function BalanceItem({ balance, btcPrice, orders }) {
    return (react_1.default.createElement("div", { className: "flex flex-col items-start sm:items-center border border-secondary rounded-lg w-full justify-between bg-light transition-colors" },
        react_1.default.createElement("h4", { className: "text-left w-full flex gap-2 text-xs text-primary font-medium px-2 py-1 border-b border-secondary" },
            balance.utxo ? react_1.default.createElement(lucide_react_1.Link, { className: "w-4 h-4 text-primary" }) : react_1.default.createElement(lucide_react_1.Unlink, { className: "w-4 h-4 text-primary" }),
            balance.utxo ? "UTXO balance" : "Account balance"),
        react_1.default.createElement("div", { className: "flex flex-row gap-4 items-center sm:items-center px-3 justify-between  transition-colors w-full" },
            react_1.default.createElement("div", { className: "flex items-center gap-2 min-w-2/4" },
                react_1.default.createElement("div", { className: "flex flex-row text-sm items-center gap-3 sm:gap-6 w-full justify-between" },
                    react_1.default.createElement("span", { className: "font-medium" }, Number(balance.qty_normalized).toFixed(2)),
                    react_1.default.createElement("span", { className: "text-primary text-xs" }, balance.utxo ? (0, index_js_3.short_address)(balance.utxo) : (0, index_js_3.short_address)(balance.address)))),
            react_1.default.createElement("div", { className: "flex items-center gap-2 w-full sm:w-auto justify-end" }, balance.utxo ? react_1.default.createElement(UtxoBalanceControls, { balance: balance, btcPrice: btcPrice, orders: orders }) : react_1.default.createElement(AccountBalanceControls, { btcPrice: btcPrice, balance: balance })))));
}
function BalanceSectionContent({ asset, btcPrice }) {
    const [loading, setLoading] = (0, react_2.useState)(false);
    const [balance, setBalance] = (0, react_2.useState)(null);
    const [orders, setOrders] = (0, react_2.useState)(null);
    const { walletAddress } = (0, index_js_2.useWallet)();
    const fetchData = (0, react_2.useCallback)(async () => {
        setLoading(true);
        try {
            const [assetBalance, swapOrdersData] = await Promise.all([
                index_js_1.bitcoinsdk.counterparty.getTokenBalance({ asset: asset, address: walletAddress }),
                index_js_1.bitcoinsdk.openbook.getAtomicSwapOrdersByAsset({ asset }),
            ]);
            setBalance(assetBalance);
            setOrders(swapOrdersData.result.filter(order => order.status === "active"));
        }
        catch (error) {
            console.error("Error fetching data:", error);
        }
        finally {
            setLoading(false);
        }
    }, [asset, walletAddress]);
    (0, react_2.useEffect)(() => {
        fetchData();
    }, [fetchData]);
    if (loading) {
        return react_1.default.createElement(Loader_component_js_1.Loader, null);
    }
    if (balance?.length === 0) {
        return react_1.default.createElement("div", { className: "text-center py-4 text-secondary" }, "No balance available");
    }
    return (react_1.default.createElement("div", { className: "flex flex-col gap-2 sm:min-h-[calc(100vh-180px)] md:min-h-[180px] " },
        react_1.default.createElement("h2", { className: "font-bold text-lg flex items-center gap-2 text-primary" },
            react_1.default.createElement(lucide_react_1.Wallet, { className: "w-5 h-5" }),
            "Your balance"),
        react_1.default.createElement("div", { className: "flex flex-col gap-2 p-1 max-h-[145px] overflow-y-auto" }, balance?.map((bal, index) => (react_1.default.createElement(BalanceItem, { key: `${bal.asset}-${index}`, balance: bal, btcPrice: btcPrice, orders: orders }))))));
}
function BalanceSection({ asset, btcPrice }) {
    return (react_1.default.createElement(modalContext_js_1.ModalProvider, null,
        react_1.default.createElement(BalanceSectionContent, { asset: asset, btcPrice: btcPrice }),
        react_1.default.createElement(Modal_component_js_1.Modal, null)));
}
exports.BalanceSection = BalanceSection;
