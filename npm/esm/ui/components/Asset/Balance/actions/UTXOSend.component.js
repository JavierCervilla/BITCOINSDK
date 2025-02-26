import React from "react";
import { useState } from "react";
import * as bitcoin from "bitcoinjs-lib";
import { Send } from "lucide-react";
import bitcoinsdk from "../../../../../core/index.js";
import { useModal } from "../../../../context/modalContext.js";
import { useWallet } from "../../../../index.js";
import { Loader } from "../../../Loader/Loader.component.js";
import { showToast } from "../../../Toast/Toast.component.js";
import { short_address } from "../../../../utils/index.js";
export function UTXOSendAction({ balance }) {
    const [recipient, setRecipient] = useState("");
    const [loading, setLoading] = useState(false);
    const { closeModal } = useModal();
    const { signPSBT } = useWallet();
    function validateSendParams() {
        if (!recipient)
            throw new Error("Recipient address are required");
    }
    async function sendTransaction() {
        validateSendParams();
        const params = {
            destination: recipient,
            utxo: balance.utxo,
        };
        const { psbt, inputsToSign } = await bitcoinsdk.counterparty.sendAssetInUTXO(params);
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
    if (loading)
        return React.createElement(Loader, null);
    return (React.createElement("form", { onSubmit: handleSubmit, className: "bg-light/5 border border-primary/20 rounded-lg p-6 shadow-lg max-w-md mx-auto" },
        React.createElement("div", { className: "space-y-6" },
            React.createElement("div", { className: "text-center" },
                React.createElement(Send, { className: "w-12 h-12 text-primary mx-auto mb-2" }),
                React.createElement("h1", { className: "text-2xl font-bold text-primary" },
                    "Send ",
                    balance.asset)),
            React.createElement("div", { className: "bg-light/10 rounded-md p-4" },
                React.createElement("p", { className: "text-sm text-secondary mb-1" }, "UTXO"),
                React.createElement("p", { className: "text-lg font-medium text-primary" }, short_address(balance.utxo))),
            React.createElement("div", { className: "bg-light/10 rounded-md p-4" },
                React.createElement("p", { className: "text-sm text-secondary mb-1" }, "Amount"),
                React.createElement("p", { className: "text-lg font-medium text-primary" },
                    Number(balance.qty_normalized),
                    " ",
                    balance.asset)),
            React.createElement("div", null,
                React.createElement("label", { htmlFor: "recipient", className: "block text-sm font-medium text-secondary mb-1" }, "Recipient address"),
                React.createElement("input", { type: "text", id: "recipient", value: recipient, onChange: (e) => setRecipient(e.target.value), className: "block w-full rounded-md border border-secondary bg-light/10 text-primary p-2 shadow-sm focus:border-primary focus:ring-1 focus:ring-primary transition-colors", placeholder: "Enter recipient's address" })),
            React.createElement("button", { type: "submit", className: "w-full cursor-pointer bg-primary text-light border border-primary rounded-md py-3 px-4 text-lg font-semibold hover:bg-primary/90 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50" },
                "Send ",
                balance.asset),
            React.createElement("p", { className: "text-xs text-center text-secondary mt-4" },
                "Please double-check the recipient address before sending.",
                React.createElement("br", null),
                React.createElement("span", { className: "text-sm text-primary font-medium" }, "If you have an active order in this UTXO, it will be cancelled.")))));
}
