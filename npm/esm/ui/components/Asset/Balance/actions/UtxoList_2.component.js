import React from "react";
import { useState } from "react";
import * as bitcoin from "bitcoinjs-lib";
import { BadgeDollarSign } from 'lucide-react';
import { useModal } from "../../../../context/modalContext.js";
import { useWallet } from "../../../../index.js";
import bitcoinsdk from "../../../../../core/index.js";
import { Loader } from "../../../Loader/Loader.component.js";
import { showToast } from "../../../Toast/Toast.component.js";
import { short_address } from "../../../../utils/index.js";
export function ListUTXOAction({ balance, btcPrice }) {
    const [price, setPrice] = useState("");
    const [loading, setLoading] = useState(false);
    const { closeModal } = useModal();
    const { walletAddress, signPSBT } = useWallet();
    function validateListOrderParams() {
        if (!balance.utxo)
            throw new Error("UTXO is required");
        if (!walletAddress)
            throw new Error("Seller is required");
        if (!price)
            throw new Error("Price is required");
        if (Number(price) <= 0 || Number.isNaN(Number(price)))
            throw new Error("Price must be greater than 0");
    }
    async function sendTransaction() {
        validateListOrderParams();
        const paramsForListingPsbt = {
            utxo: balance.utxo,
            seller: walletAddress,
            price: Number(price),
        };
        const { psbt, inputsToSign } = await bitcoinsdk.openbook.getPsbtForListOrder(paramsForListingPsbt);
        console.log({ psbt, inputsToSign });
        const signedPsbt = await signPSBT(psbt, {
            inputsToSign,
            autoFinalized: false,
            broadcast: false,
        });
        if (!signedPsbt)
            throw new Error("Failed to sign PSBT");
        console.log({ signedPsbt });
        const feeRate = await bitcoinsdk.openbook.utils.getMempoolFees();
        const params = {
            utxo: balance.utxo,
            seller: walletAddress,
            price: Number(price),
            feeRate: feeRate?.fastestFee || 2,
            psbt: signedPsbt
        };
        const { psbt: psbtForListing, inputsToSign: inputsToSignForListing } = await bitcoinsdk.openbook.getPsbtForSubmitOrderOnchain(params);
        console.log({
            psbtForListing,
            inputsToSignForListing
        });
        const signedPsbtForListing = await signPSBT(psbtForListing, {
            inputsToSign: inputsToSignForListing,
            autoFinalized: false,
            broadcast: true,
        });
        const tx = bitcoin.Psbt.fromHex(signedPsbtForListing);
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
                React.createElement(BadgeDollarSign, { className: "w-12 h-12 text-primary mx-auto mb-2" }),
                React.createElement("h1", { className: "text-2xl font-bold text-primary" }, "List Order"),
                React.createElement("p", { className: "text-sm text-secondary mt-1" },
                    "UTXO: ",
                    short_address(balance.utxo)),
                React.createElement("p", { className: "text-sm text-secondary mt-1" },
                    "Asset: ",
                    balance.asset),
                React.createElement("p", { className: "text-sm text-secondary mt-1" },
                    "Qty: ",
                    balance.qty_normalized)),
            React.createElement("div", null,
                React.createElement("label", { htmlFor: "amount", className: "block text-sm font-medium text-secondary mb-1" }, "Price for listing"),
                React.createElement("div", { className: "relative flex items-center" },
                    React.createElement("input", { type: "number", id: "price", step: 1, value: price, onChange: (e) => setPrice(e.target.value), className: "block w-full rounded-md border border-secondary bg-light/10 text-primary p-2 pr-16 shadow-sm focus:border-primary focus:ring-1 focus:ring-primary transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none", placeholder: "0.00" })),
                React.createElement("p", { className: "mt-1 text-xs text-secondary" },
                    Number(price),
                    " sats ($",
                    Number(Number(price) * btcPrice * 10 ** -8).toFixed(2),
                    ")")),
            React.createElement("button", { type: "submit", className: "w-full cursor-pointer bg-primary text-light border border-primary rounded-md py-3 px-4 text-lg font-semibold hover:bg-primary/90 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50" }, "List Utxo for sell"),
            React.createElement("p", { className: "text-xs text-center text-secondary mt-4" }, "Listing an UTXO will make it available for purchase by other users."))));
}
