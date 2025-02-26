import React from "react";
import { useState } from "react";
import * as bitcoin from "bitcoinjs-lib";
import { Link } from 'lucide-react';
import bitcoinsdk from "../../../../../core/index.js";
import { useModal } from "../../../../context/modalContext.js";
import { useWallet } from "../../../../index.js";
import { Loader } from "../../../Loader/Loader.component.js";
import { showToast } from "../../../Toast/Toast.component.js";
export function UTXOAttachAction({ balance }) {
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const { closeModal } = useModal();
    const { walletAddress, signPSBT } = useWallet();
    function validateAttachParams() {
        if (!amount)
            throw new Error("Amount is required");
        if (Number(amount) <= 0 || Number.isNaN(Number(amount)))
            throw new Error("Amount must be greater than 0");
        if (Number(amount) > Number(balance.qty_normalized))
            throw new Error("Amount exceeds available balance");
    }
    async function sendTransaction() {
        validateAttachParams();
        const qty = balance.divisible ? Number(amount) * 10 ** 8 : Number(amount);
        const params = {
            asset: balance.asset,
            address: walletAddress,
            amount: qty,
        };
        const { psbt, inputsToSign } = await bitcoinsdk.counterparty.attachToUTXO(params);
        const signedPsbt = await signPSBT(psbt, {
            inputsToSign,
            autoFinalized: false,
            broadcast: true,
        });
        if (!signedPsbt)
            throw new Error("Failed to sign PSBT");
        const tx = bitcoin.Psbt.fromHex(signedPsbt);
        const txHex = tx.finalizeAllInputs().extractTransaction().toHex();
        const { result: txid } = await bitcoinsdk.bitcoin.sendRawTransaction({ txHex });
        if (!txid)
            throw new Error("Failed to send transaction");
        return txid;
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const txid = await sendTransaction();
            showToast({
                content: (React.createElement("div", { className: "flex flex-col gap-2" },
                    React.createElement("p", { className: "text-sm font-medium text-primary" }, "Transaction sent"),
                    React.createElement("a", { href: `https://horizon.market/explorer/tx/${txid}`, target: "_blank", rel: "noopener noreferrer", className: "text-sm text-primary" }, "View on Horizon Explorer"),
                    React.createElement("a", { href: `https://mempool.space/tx/${txid}`, target: "_blank", rel: "noopener noreferrer", className: "text-sm text-primary" }, "View on Mempool Space"))),
                type: "success"
            });
        }
        catch (error) {
            showToast({
                content: (React.createElement("div", { className: "flex flex-col gap-2" },
                    React.createElement("p", { className: "text-sm font-medium text-primary" }, error?.message))),
                type: "error"
            });
        }
        finally {
            setLoading(false);
            closeModal();
        }
    };
    const handleSetMaxAmount = () => {
        setAmount(Number(balance.qty_normalized).toString());
    };
    if (loading)
        return React.createElement(Loader, null);
    return (React.createElement("form", { onSubmit: handleSubmit, className: "bg-light/5 border border-primary/20 rounded-lg p-6 shadow-lg max-w-md mx-auto" },
        React.createElement("div", { className: "space-y-6" },
            React.createElement("div", { className: "text-center" },
                React.createElement(Link, { className: "w-12 h-12 text-primary mx-auto mb-2" }),
                React.createElement("h1", { className: "text-2xl font-bold text-primary" }, "Attach to UTXO"),
                React.createElement("p", { className: "text-sm text-secondary mt-1" },
                    "Asset: ",
                    balance.asset)),
            React.createElement("div", null,
                React.createElement("label", { htmlFor: "amount", className: "block text-sm font-medium text-secondary mb-1" }, "Amount to attach to UTXO"),
                React.createElement("div", { className: "relative flex items-center" },
                    React.createElement("input", { type: "number", id: "amount", min: balance.divisible ? 0.00000001 : 1, max: Number(balance.qty_normalized), step: balance.divisible ? 0.00000001 : 1, value: amount, onChange: (e) => setAmount(e.target.value), className: "block w-full rounded-md border border-secondary bg-light/10 text-primary p-2 pr-16 shadow-sm focus:border-primary focus:ring-1 focus:ring-primary transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none", placeholder: "0.00" }),
                    React.createElement("button", { type: "button", onClick: handleSetMaxAmount, className: "absolute right-2 px-2 py-1 text-xs font-semibold text-primary bg-light cursor-pointer border border-primary rounded hover:bg-primary hover:text-light transition-colors" },
                        "Max: ",
                        Number(balance.qty_normalized))),
                React.createElement("p", { className: "mt-1 text-xs text-secondary" },
                    "Max: ",
                    Number(balance.qty_normalized),
                    " ",
                    balance.asset)),
            React.createElement("button", { type: "submit", className: "w-full cursor-pointer bg-primary text-light border border-primary rounded-md py-3 px-4 text-lg font-semibold hover:bg-primary/90 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50" }, "Attach to UTXO"),
            React.createElement("p", { className: "text-xs text-center text-secondary mt-4" }, "Attaching to a UTXO will lock the asset to a specific Bitcoin transaction output."))));
}
