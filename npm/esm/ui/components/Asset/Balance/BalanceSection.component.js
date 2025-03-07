import React from "react";
import { useState, useEffect, useCallback } from "react";
import { Link, Unlink, Wallet, Send, BadgeDollarSign } from "lucide-react";
import { bitcoinsdk } from "../../../../core/index.js";
import { useWallet } from "../../../index.js";
import { short_address } from "../../../utils/index.js";
import { Loader } from "../../Loader/Loader.component.js";
import { BalanceControl } from "./actions/BalanceControl.component.js";
import { AccountSendAction } from "./actions/AccountSend.component.js";
import { UTXOSendAction } from "./actions/UTXOSend.component.js";
import { UTXOAttachAction } from "./actions/UTXOAttach.component.js";
import { UTXODetachAction } from "./actions/UTXODetach.component.js";
import { ModalProvider } from "../../../context/modalContext.js";
import { Modal } from "../../Modal/Modal.component.js";
import { ListUTXOAction } from "./actions/UTXOList.component.js";
function AccountBalanceControls({ balance, btcPrice: _btcPrice }) {
    const { walletAddress } = useWallet();
    if (!walletAddress)
        return null;
    return (React.createElement("div", { className: "flex items-center gap-2" },
        React.createElement(BalanceControl, { icon: Send, label: "Send", action: React.createElement(AccountSendAction, { balance: balance }) }),
        React.createElement(BalanceControl, { icon: Link, label: "Attach to UTXO", action: React.createElement(UTXOAttachAction, { balance: balance }) })));
}
function UtxoBalanceControls({ balance, btcPrice, orders }) {
    const { walletAddress } = useWallet();
    if (!walletAddress)
        return null;
    return (React.createElement("div", { className: "flex items-center gap-2" },
        React.createElement(BalanceControl, { icon: Send, label: "Send", action: React.createElement(UTXOSendAction, { balance: balance }) }),
        React.createElement(BalanceControl, { icon: Unlink, label: "Detach from UTXO", action: React.createElement(UTXODetachAction, { balance: balance }) }),
        orders.length > 0 && orders.find(order => order.utxo === balance.utxo) ?
            null
            : (React.createElement(BalanceControl, { icon: BadgeDollarSign, label: "Sell Item", action: React.createElement(ListUTXOAction, { balance: balance, btcPrice: btcPrice }) }))));
}
function BalanceItem({ balance, btcPrice, orders }) {
    return (React.createElement("div", { className: "flex flex-col items-start sm:items-center border border-secondary rounded-lg w-full justify-between bg-light transition-colors" },
        React.createElement("h4", { className: "text-left w-full flex gap-2 text-xs text-primary font-medium px-2 py-1 border-b border-secondary" },
            balance.utxo ? React.createElement(Link, { className: "w-4 h-4 text-primary" }) : React.createElement(Unlink, { className: "w-4 h-4 text-primary" }),
            balance.utxo ? "UTXO balance" : "Account balance"),
        React.createElement("div", { className: "flex flex-row gap-4 items-center sm:items-center px-3 justify-between  transition-colors w-full" },
            React.createElement("div", { className: "flex items-center gap-2 min-w-2/4" },
                React.createElement("div", { className: "flex flex-row text-sm items-center gap-3 sm:gap-6 w-full justify-between" },
                    React.createElement("span", { className: "font-medium" }, Number(balance.qty_normalized).toFixed(2)),
                    React.createElement("span", { className: "text-primary text-xs" }, balance.utxo ? short_address(balance.utxo) : short_address(balance.address)))),
            React.createElement("div", { className: "flex items-center gap-2 w-full sm:w-auto justify-end" }, balance.utxo ? React.createElement(UtxoBalanceControls, { balance: balance, btcPrice: btcPrice, orders: orders }) : React.createElement(AccountBalanceControls, { btcPrice: btcPrice, balance: balance })))));
}
function BalanceSectionContent({ asset, btcPrice }) {
    const [loading, setLoading] = useState(false);
    const [balance, setBalance] = useState(null);
    const [orders, setOrders] = useState(null);
    const { walletAddress } = useWallet();
    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const [assetBalance, swapOrdersData] = await Promise.all([
                bitcoinsdk.counterparty.getTokenBalance({ asset: asset, address: walletAddress }),
                bitcoinsdk.openbook.getAtomicSwapOrdersByAsset({ asset }),
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
    useEffect(() => {
        fetchData();
    }, [fetchData]);
    if (loading) {
        return React.createElement(Loader, null);
    }
    if (balance?.length === 0) {
        return React.createElement("div", { className: "text-center py-4 text-secondary" }, "No balance available");
    }
    return (React.createElement("div", { className: "flex flex-col gap-2 sm:min-h-[calc(100vh-180px)] md:min-h-[180px] " },
        React.createElement("h2", { className: "font-bold text-lg flex items-center gap-2 text-primary" },
            React.createElement(Wallet, { className: "w-5 h-5" }),
            "Your balance"),
        React.createElement("div", { className: "flex flex-col gap-2 p-1 max-h-[145px] overflow-y-auto" }, balance?.map((bal, index) => (React.createElement(BalanceItem, { key: `${bal.asset}-${index}`, balance: bal, btcPrice: btcPrice, orders: orders }))))));
}
export function BalanceSection({ asset, btcPrice }) {
    return (React.createElement(ModalProvider, null,
        React.createElement(BalanceSectionContent, { asset: asset, btcPrice: btcPrice }),
        React.createElement(Modal, null)));
}
