"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UTXOAttachAction = void 0;
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const bitcoin = __importStar(require("bitcoinjs-lib"));
const lucide_react_1 = require("lucide-react");
const index_js_1 = __importDefault(require("../../../../../core/index.js"));
const modalContext_js_1 = require("../../../../context/modalContext.js");
const index_js_2 = require("../../../../index.js");
const Loader_component_js_1 = require("../../../Loader/Loader.component.js");
const Toast_component_js_1 = require("../../../Toast/Toast.component.js");
function UTXOAttachAction({ balance }) {
    const [amount, setAmount] = (0, react_2.useState)("");
    const [loading, setLoading] = (0, react_2.useState)(false);
    const { closeModal } = (0, modalContext_js_1.useModal)();
    const { walletAddress, signPSBT } = (0, index_js_2.useWallet)();
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
        const { psbt, inputsToSign } = await index_js_1.default.counterparty.attachToUTXO(params);
        const signedPsbt = await signPSBT(psbt, {
            inputsToSign,
            autoFinalized: false,
            broadcast: true,
        });
        if (!signedPsbt)
            throw new Error("Failed to sign PSBT");
        const tx = bitcoin.Psbt.fromHex(signedPsbt);
        const txHex = tx.finalizeAllInputs().extractTransaction().toHex();
        const { result: txid } = await index_js_1.default.bitcoin.sendRawTransaction({ txHex });
        if (!txid)
            throw new Error("Failed to send transaction");
        return txid;
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const txid = await sendTransaction();
            (0, Toast_component_js_1.showToast)({
                content: (react_1.default.createElement("div", { className: "flex flex-col gap-2" },
                    react_1.default.createElement("p", { className: "text-sm font-medium text-primary" }, "Transaction sent"),
                    react_1.default.createElement("a", { href: `https://horizon.market/explorer/tx/${txid}`, target: "_blank", rel: "noopener noreferrer", className: "text-sm text-primary" }, "View on Horizon Explorer"),
                    react_1.default.createElement("a", { href: `https://mempool.space/tx/${txid}`, target: "_blank", rel: "noopener noreferrer", className: "text-sm text-primary" }, "View on Mempool Space"))),
                type: "success"
            });
        }
        catch (error) {
            (0, Toast_component_js_1.showToast)({
                content: (react_1.default.createElement("div", { className: "flex flex-col gap-2" },
                    react_1.default.createElement("p", { className: "text-sm font-medium text-primary" }, error?.message))),
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
        return react_1.default.createElement(Loader_component_js_1.Loader, null);
    return (react_1.default.createElement("form", { onSubmit: handleSubmit, className: "bg-light/5 border border-primary/20 rounded-lg p-6 shadow-lg max-w-md mx-auto" },
        react_1.default.createElement("div", { className: "space-y-6" },
            react_1.default.createElement("div", { className: "text-center" },
                react_1.default.createElement(lucide_react_1.Link, { className: "w-12 h-12 text-primary mx-auto mb-2" }),
                react_1.default.createElement("h1", { className: "text-2xl font-bold text-primary" }, "Attach to UTXO"),
                react_1.default.createElement("p", { className: "text-sm text-secondary mt-1" },
                    "Asset: ",
                    balance.asset)),
            react_1.default.createElement("div", null,
                react_1.default.createElement("label", { htmlFor: "amount", className: "block text-sm font-medium text-secondary mb-1" }, "Amount to attach to UTXO"),
                react_1.default.createElement("div", { className: "relative flex items-center" },
                    react_1.default.createElement("input", { type: "number", id: "amount", min: balance.divisible ? 0.00000001 : 1, max: Number(balance.qty_normalized), step: balance.divisible ? 0.00000001 : 1, value: amount, onChange: (e) => setAmount(e.target.value), className: "block w-full rounded-md border border-secondary bg-light/10 text-primary p-2 pr-16 shadow-sm focus:border-primary focus:ring-1 focus:ring-primary transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none", placeholder: "0.00" }),
                    react_1.default.createElement("button", { type: "button", onClick: handleSetMaxAmount, className: "absolute right-2 px-2 py-1 text-xs font-semibold text-primary bg-light cursor-pointer border border-primary rounded hover:bg-primary hover:text-light transition-colors" },
                        "Max: ",
                        Number(balance.qty_normalized))),
                react_1.default.createElement("p", { className: "mt-1 text-xs text-secondary" },
                    "Max: ",
                    Number(balance.qty_normalized),
                    " ",
                    balance.asset)),
            react_1.default.createElement("button", { type: "submit", className: "w-full cursor-pointer bg-primary text-light border border-primary rounded-md py-3 px-4 text-lg font-semibold hover:bg-primary/90 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50" }, "Attach to UTXO"),
            react_1.default.createElement("p", { className: "text-xs text-center text-secondary mt-4" }, "Attaching to a UTXO will lock the asset to a specific Bitcoin transaction output."))));
}
exports.UTXOAttachAction = UTXOAttachAction;
