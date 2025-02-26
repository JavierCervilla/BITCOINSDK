import React from "react";
import { useState } from "react";
import * as bitcoin from "bitcoinjs-lib";
import { Unlink } from "lucide-react";
import { useModal } from "../../../../context/modalContext.js";
import { useWallet } from "../../../../index.js";
import bitcoinsdk from "../../../../../core/index.js";
import { Loader } from "../../../Loader/Loader.component.js";
import { showToast } from "../../../Toast/Toast.component.js";
import { short_address } from "../../../../utils/index.js";
export function UTXODetachAction({ balance }) {
    const [loading, setLoading] = useState(false);
    const { closeModal } = useModal();
    const { walletAddress, signPSBT } = useWallet();
    async function sendTransaction() {
        const params = {
            utxo: balance.utxo,
            destination: walletAddress,
        };
        const { psbt, inputsToSign } = await bitcoinsdk.counterparty.detachFromUTXO(params);
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
                    React.createElement("p", { className: "text-sm font-medium text-primary" }, error.message))),
                type: "error"
            });
        }
        finally {
            setLoading(false);
            closeModal();
        }
    };
    if (loading)
        return React.createElement(Loader, null);
    return (React.createElement("form", { onSubmit: handleSubmit, className: "bg-light/5 border border-primary/20 rounded-lg p-6 shadow-lg max-w-md mx-auto" },
        React.createElement("div", { className: "space-y-6" },
            React.createElement("div", { className: "text-center" },
                React.createElement(Unlink, { className: "w-12 h-12 text-primary mx-auto mb-2" }),
                React.createElement("h1", { className: "text-2xl font-bold text-primary" }, "Detach from UTXO")),
            React.createElement("div", { className: "bg-light/10 rounded-md p-4" },
                React.createElement("p", { className: "text-sm text-secondary mb-1" }, "UTXO"),
                React.createElement("p", { className: "text-lg font-medium text-primary" }, short_address(balance.utxo))),
            React.createElement("div", { className: "bg-light/10 rounded-md p-4" },
                React.createElement("p", { className: "text-sm text-secondary mb-1" }, "Amount"),
                React.createElement("p", { className: "text-lg font-medium text-primary" },
                    Number(balance.qty_normalized),
                    " ",
                    balance.asset)),
            React.createElement("button", { type: "submit", className: "w-full cursor-pointer bg-primary text-light border border-primary rounded-md py-3 px-4 text-lg font-semibold hover:bg-primary/90 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50" }, "Detach from UTXO"),
            React.createElement("p", { className: "text-xs text-center text-secondary mt-4" },
                "This action will detach the asset from the specified UTXO and return it to your wallet. ",
                React.createElement("br", null),
                React.createElement("span", { className: "text-sm text-primary font-medium" }, "If you have an active order in this UTXO, it will be cancelled.")))));
}
