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
exports.UTXOSendAction = void 0;
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const bitcoin = __importStar(require("bitcoinjs-lib"));
const lucide_react_1 = require("lucide-react");
const index_js_1 = __importDefault(require("../../../../../core/index.js"));
const modalContext_js_1 = require("../../../../context/modalContext.js");
const index_js_2 = require("../../../../index.js");
const Loader_component_js_1 = require("../../../Loader/Loader.component.js");
const Toast_component_js_1 = require("../../../Toast/Toast.component.js");
const index_js_3 = require("../../../../utils/index.js");
function UTXOSendAction({ balance }) {
    const [recipient, setRecipient] = (0, react_2.useState)("");
    const [loading, setLoading] = (0, react_2.useState)(false);
    const { closeModal } = (0, modalContext_js_1.useModal)();
    const { signPSBT } = (0, index_js_2.useWallet)();
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
        const { psbt, inputsToSign } = await index_js_1.default.counterparty.sendAssetInUTXO(params);
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
    if (loading)
        return react_1.default.createElement(Loader_component_js_1.Loader, null);
    return (react_1.default.createElement("form", { onSubmit: handleSubmit, className: "bg-light/5 border border-primary/20 rounded-lg p-6 shadow-lg max-w-md mx-auto" },
        react_1.default.createElement("div", { className: "space-y-6" },
            react_1.default.createElement("div", { className: "text-center" },
                react_1.default.createElement(lucide_react_1.Send, { className: "w-12 h-12 text-primary mx-auto mb-2" }),
                react_1.default.createElement("h1", { className: "text-2xl font-bold text-primary" },
                    "Send ",
                    balance.asset)),
            react_1.default.createElement("div", { className: "bg-light/10 rounded-md p-4" },
                react_1.default.createElement("p", { className: "text-sm text-secondary mb-1" }, "UTXO"),
                react_1.default.createElement("p", { className: "text-lg font-medium text-primary" }, (0, index_js_3.short_address)(balance.utxo))),
            react_1.default.createElement("div", { className: "bg-light/10 rounded-md p-4" },
                react_1.default.createElement("p", { className: "text-sm text-secondary mb-1" }, "Amount"),
                react_1.default.createElement("p", { className: "text-lg font-medium text-primary" },
                    Number(balance.qty_normalized),
                    " ",
                    balance.asset)),
            react_1.default.createElement("div", null,
                react_1.default.createElement("label", { htmlFor: "recipient", className: "block text-sm font-medium text-secondary mb-1" }, "Recipient address"),
                react_1.default.createElement("input", { type: "text", id: "recipient", value: recipient, onChange: (e) => setRecipient(e.target.value), className: "block w-full rounded-md border border-secondary bg-light/10 text-primary p-2 shadow-sm focus:border-primary focus:ring-1 focus:ring-primary transition-colors", placeholder: "Enter recipient's address" })),
            react_1.default.createElement("button", { type: "submit", className: "w-full cursor-pointer bg-primary text-light border border-primary rounded-md py-3 px-4 text-lg font-semibold hover:bg-primary/90 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50" },
                "Send ",
                balance.asset),
            react_1.default.createElement("p", { className: "text-xs text-center text-secondary mt-4" },
                "Please double-check the recipient address before sending.",
                react_1.default.createElement("br", null),
                react_1.default.createElement("span", { className: "text-sm text-primary font-medium" }, "If you have an active order in this UTXO, it will be cancelled.")))));
}
exports.UTXOSendAction = UTXOSendAction;
