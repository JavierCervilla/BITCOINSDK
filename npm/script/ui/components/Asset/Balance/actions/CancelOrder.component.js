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
exports.CancelOrderAction = void 0;
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const bitcoin = __importStar(require("bitcoinjs-lib"));
const index_js_1 = __importDefault(require("../../../../../core/index.js"));
const index_js_2 = require("../../../../index.js");
const Loader_component_js_1 = require("../../../Loader/Loader.component.js");
const Toast_component_js_1 = require("../../../Toast/Toast.component.js");
function CancelOrderAction({ order }) {
    const [loading, setLoading] = (0, react_2.useState)(false);
    const { signPSBT } = (0, index_js_2.useWallet)();
    async function sendTransaction() {
        const feeRate = await index_js_1.default.openbook.utils.getMempoolFees();
        const params = {
            id: order.txid,
            feeRate: feeRate?.fastestFee || 2
        };
        const { psbt, inputsToSign } = await index_js_1.default.openbook.cancelAtomicSwap(params);
        console.log(psbt, inputsToSign);
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
    const handleCancel = async (e) => {
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
                    react_1.default.createElement("p", { className: "text-sm font-medium text-primary" }, error.message))),
                type: "error"
            });
        }
        finally {
            setLoading(false);
        }
    };
    if (loading)
        return react_1.default.createElement(Loader_component_js_1.Loader, { size: 26 });
    return (react_1.default.createElement("button", { className: "w-full ml-10 sm:ml-2 cursor-pointer text-sm text-primary rounded-lg p-2 bg-warning border border-primary hover:bg-primary hover:text-light transition-colors font-mono truncate", type: "button", onClick: handleCancel }, "Cancel"));
}
exports.CancelOrderAction = CancelOrderAction;
